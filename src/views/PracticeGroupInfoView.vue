<template>
    <div class="main-page">
        <SideBar/>
        <div class="work-flow">
            <div v-if="practiceGroup.group_id">
                <div class="page-title">
                    <span>О группе {{ practiceGroup.group_name }}</span>
                    <button class="button-back" @click="$router.push({ name: 'practice-groups' })">Назад</button>
                </div>
                <div class="charts-grid">
                    <div class="cell">
                        <PieChart :title="'Процент выполнения контрольных'" :data="testResultChartData" :options="doughnutChartOptions"/>
                    </div>
                    <div class="cell">
                        <PieChart :title="'Процент посещаемости'" :data="attendanceChartData" :options="doughnutChartOptions"/>
                    </div>
                    <div class="cell">
                        <BarChart height="10000" :title="'Успеваемость студентов'" :data="totalScoreChartData" :options="hbarChartOptions"/>
                    </div>
                    <div class="cell">
                    </div>
                </div>
                <div class="page-title">
                    <span>Список студентов</span>
                </div>
                <div class="basic-list">
                    <router-link
                        v-for="student in studentList"
                        :to="{name: 'student-info', params: {id: student.student_id}}"
                        :key="student.student_id"
                        tag="ul"
                    >
                        <li class="basic-list-item">{{ student.student_name }}</li>
                    </router-link>
                </div>
            </div>
            <div v-else>
                <div class="page-title">
                    <span>Такой группы нет</span>
                    <button class="button-back" @click="$router.push({ name: 'practice-groups' })">Назад</button>
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
import BasicChart from '@/components/BasicChart.vue'
import axios from 'axios'

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++)
        color += letters[Math.floor(Math.random() * 16)];
    return color;
}

export default {
    components: { SideBar, BarChart, LineChart, PieChart, BasicChart },

    data(){
        return {
            practiceGroup: {},
            studentList: [],

            hbarChartOptions: {
                responsive: true,
                indexAxis: 'y'
            },

            doughnutChartOptions: {
                responsive: true,
                cutout: '50%'
            },

            testResultChartData: {
                labels: [],
                datasets: [{}]
            },

            attendanceChartData: {
                labels: [],
                datasets: [{}]
            },

            totalScoreChartData: {
                labels: [],
                datasets: [{}]
            },
        }
    },

    mounted() {
        this.fetchPracticeGroup()
    },

    methods: {
        async fetchPracticeGroup() {
            try {
                const response = await axios.get('http://localhost:3000/p_group/' + String(this.$route.params.id))
                if (response.data.group_id) {
                    this.practiceGroup = response.data
                    const practiceGroupTestResult = (await axios.get('http://localhost:3000/p_group/' + String(this.practiceGroup.group_id) + '/testresult')).data.test_result
                    this.testResultChartData = {
                        labels: ['Баллы'],
                        datasets: [{
                            backgroundColor: ['#41B883', '#E46651'],
                            data: [practiceGroupTestResult, 1 - practiceGroupTestResult]
                        }]
                    }
                    const practiceGroupAttendance = (await axios.get('http://localhost:3000/p_group/' + String(this.practiceGroup.group_id) + '/attendance')).data.attendance
                    this.attendanceChartData = {
                        labels: ['П', 'Н'],
                        datasets: [{
                            backgroundColor: ['#41B883', '#E46651'],
                            data: [practiceGroupAttendance, 1 - practiceGroupAttendance]
                        }]
                    }
                    const practiceGroupTotalScore = (await axios.get('http://localhost:3000/p_group/' + String(this.practiceGroup.group_id) + '/totalscore')).data
                    practiceGroupTotalScore.sort((score1, score2) => {
                        if (score1.score == score2.score) return 0
                        if (score1.score > score2.score) return 1
                        return -1
                    })
                    this.studentList = []
                    const labels = []
                    const data = []
                    const backgroundColor = []
                    for (const score of practiceGroupTotalScore) {
                        const student = (await axios.get('http://localhost:3000/student/' + String(score.student_id))).data
                        this.studentList.push(student)
                        labels.push(student.student_name)
                        data.push(score.score)
                        backgroundColor.push(getRandomColor())
                    }
                    this.studentList.sort((student1, student2) => student1.student_name?.localeCompare(student2.student_name))
                    this.totalScoreChartData = {
                        labels: labels,
                        datasets: [{
                            label: 'Баллы',
                            data: data,
                            backgroundColor: backgroundColor
                        }]
                    }
                } else
                    this.practiceGroup = undefined  //group not found
            } catch (e) {
                console.log(e)
                this.student = undefined
            }
        }
    }
}
</script>

<style>
.button-back {
    margin-left: 30px;
}
</style>