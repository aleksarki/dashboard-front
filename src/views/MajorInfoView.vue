<template>
    <div class="main-page">
        <SideBar/>
        <div class="work-flow">
            <div v-if="major">
                <div class="page-title">
                    <span>О направлении {{ major.dir_name }}</span>
                    <button class="button-back" @click="$router.push({ name: 'majors' })">Назад</button>
                </div>
                <div class="charts-grid">
                    <div class="cell">
                        <PieChart :title="'Средняя посещаемость'" :data="attendanceChartData" :options="doughnutChartOptions"/>
                    </div>
                    <div class="cell">
                        <PieChart :title="'Средний балл студентов'" :data="totalScoreNumChartData" :options="doughnutChartOptions"/>
                    </div>
                    <div class="cell">
                        <BarChart :title="'Средний балл по группам'" :data="totalScoreHistChartData" :options="hbarChartOptions"/>
                    </div>
                    <div class="cell">
                        <PieChart :title="'Процент выполнения контрольных'" :data="testResultChartData" :options="doughnutChartOptions"/>
                    </div>
                </div>
                <span class="page-title">Список групп практики</span>
                <div class="basic-list">
                    <router-link
                        v-for="practiceGroup in practiceGroupList"
                        :to="{name: 'practice-group-info', params: {id: practiceGroup.group_id}}"
                        :key="practiceGroup.group_id"
                        tag="ul"
                    >
                        <li class="basic-list-item">{{ practiceGroup.group_name }}</li>
                    </router-link>
                </div>
                <span class="page-title">Список групп лекций</span>
                <div class="basic-list">
                    <router-link
                        v-for="lectureGroup in lectureGroupList"
                        :to="{name: 'lecture-group-info', params: {id: lectureGroup.group_id}}"
                        :key="lectureGroup.group_id"
                        tag="ul"
                    >
                        <li class="basic-list-item">{{ lectureGroup.group_name }}</li>
                    </router-link>
                </div>
            </div>
            <div v-else>
                <div class="page-title">
                    <span>Такого направления нет</span>
                    <button class="button-back" @click="$router.push({ name: 'majors' })">Назад</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import BarChart from '@/components/BarChart.vue'
import LineChart from '@/components/LineChart.vue'
import PieChart from '@/components/PieChart.vue'
import axios from 'axios'

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++)
        color += letters[Math.floor(Math.random() * 16)];
    return color;
}

export default {
    components: { SideBar, BarChart, LineChart, PieChart },

    data() {
        return {
            major: {},
            practiceGroupList: [],
            lectureGroupList: [],

            hbarChartOptions: {
                responsive: true,
                indexAxis: 'y'
            },

            doughnutChartOptions: {
                responsive: true,
                cutout: '50%'
            },

            attendanceChartData: {
                labels: [],
                datasets: [{}]
            },

            totalScoreNumChartData: {
                labels: [],
                datasets: [{}]
            },

            totalScoreHistChartData: {
                labels: [],
                datasets: [{}]
            },

            testResultChartData: {
                labels: [],
                datasets: [{}]
            },
        }
    },

    mounted() {
        this.fetchMajor()
        
    },

    methods: {
        async fetchMajor() {
            try {
                const response = await axios.get('http://localhost:3000/direction/' + String(this.$route.params.id))
                if (response.data.dir_id) {
                    this.major = response.data
                    const majorAttendance = (await axios.get('http://localhost:3000/direction/' + String(this.major.dir_id) + '/attendance')).data.attendance
                    this.attendanceChartData = {
                        labels: ['П', 'Н'],
                        datasets: [{
                            backgroundColor: ['#41B883', '#E46651'],
                            data: [majorAttendance, 1 - majorAttendance]
                        }]
                    }
                    const majorTotalScoreNum = (await axios.get('http://localhost:3000/direction/' + String(this.major.dir_id) + '/totalscorenum')).data.score
                    this.totalScoreNumChartData = {
                        labels: ['Баллы'],
                        datasets: [{
                            backgroundColor: ['#41B883', '#E46651'],
                            data: [majorTotalScoreNum, 100 - majorTotalScoreNum]
                        }]
                    }
                    const majorTotalScoreHist = (await axios.get('http://localhost:3000/direction/' + String(this.major.dir_id) + '/totalscorehist')).data
                    majorTotalScoreHist.sort((score1, score2) => {
                        if (score1.score == score2.score) return 0
                        if (score1.score > score2.score) return 1
                        return -1
                    })
                    this.practiceGroupList = []
                    this.lectureGroupList = []
                    const labels = []
                    const data = []
                    const backgroundColor = []
                    for (const score of majorTotalScoreHist) {
                        if (score.l_group_id) {  // lecture group
                            const lectureGroup = (await axios.get('http://localhost:3000/l_group/' + String(score.l_group_id))).data
                            this.lectureGroupList.push(lectureGroup)
                            labels.push(lectureGroup.group_name)
                            data.push(score.score)
                            backgroundColor.push(getRandomColor())
                        } else {  // practice group
                            const practiceGroup = (await axios.get('http://localhost:3000/p_group/' + String(score.p_group_id))).data
                            this.practiceGroupList.push(practiceGroup)
                            labels.push(practiceGroup.group_name)
                            data.push(score.score)
                            backgroundColor.push(getRandomColor())
                        }
                    }
                    //this.practiceGroupList.sort((p_group1, p_group2) => p_group1.group_name?.localeCompare(p_group2.group_name))  //result is odd (not surprised)
                    //this.lectureGroupList.sort((l_group1, l_group2) => l_group1.group_name?.localeCompare(l_group2.group_name))  // fixme
                    this.totalScoreHistChartData = {
                        labels: labels,
                        datasets: [{
                            label: 'Баллы',
                            data: data,
                            backgroundColor: backgroundColor
                        }]
                    }
                    const majorTestResult = (await axios.get('http://localhost:3000/direction/' + String(this.major.dir_id) + '/testresult')).data.test_result
                    this.testResultChartData = {
                        labels: ['Баллы'],
                        datasets: [{
                            backgroundColor: ['#41B883', '#E46651'],
                            data: [majorTestResult, 1 - majorTestResult]
                        }]
                    }
                } else
                    this.major = undefined  //major not found
            } catch (e) {
                console.log(e)
                this.major = undefined
            }
        }
    }
}
</script>