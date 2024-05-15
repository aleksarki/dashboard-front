<template>
    <div class="main-page">
        <SideBar/>
        <div class="work-flow">
            <div v-if="student">
                <div class="page-title">
                    <span>О студенте {{ student.student_name }}</span>
                    <button class="button-back" @click="$router.push({ name: 'students' })">Назад</button>
                </div>
                <div class="student-information">
                    <span>Направление: <router-link :to="{name: 'major-info', params: {id: studentMajor.dir_id}}">{{ studentMajor.dir_name }}</router-link></span><br>
                    <span>Группа лекции: {{ studentLectionGroup.group_name }}</span><br>
                    <span>Группа практики: <router-link :to="{name: 'practice-group-info', params: {id: studentPracticeGroup.group_id}}">{{ studentPracticeGroup.group_name }}</router-link></span>
                </div>
                <div class="charts-grid">
                    <div class="cell">
                        <PieChart :title="'Процент посещаемости'" :data="attendanceChartData" :options="doughnutChartOptions"/>
                    </div>
                    <div class="cell">
                        <PieChart :title="'Текущая успеваемость'" :data="totalScoreChartData" :options="doughnutChartOptions"/>
                    </div>
                    <div class="cell">
                        <PieChart :title="'Процент выполнения контрольных'" :data="testResultChartData" :options="doughnutChartOptions"/>
                    </div>
                    <div class="cell">
                        <BarChart :title="'Баллы по практикам'" :data="practiceScoresChartData" :options="barChartOptions"/>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="page-title">
                    <span>Такого студента нет</span>
                    <button class="button-back" @click="$router.push({ name: 'students' })">Назад</button>
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
            student: {},
            studentMajor: '',
            studentLectionGroup: '',
            studentPracticeGroup: '',

            barChartOptions: {
                responsive: true,
                //indexAxis: 'y'
            },

            doughnutChartOptions: {
                responsive: true,
                cutout: '50%'
            },

            attendanceChartData: {
                labels: [],
                datasets: [{}]
            },

            totalScoreChartData: {
                labels: [],
                datasets: [{}]
            },
            
            testResultChartData: {
                labels: [],
                datasets: [{}]
            },

            practiceScoresChartData: {
                labels: [],
                datasets: [{}]
            }
        }
    },

    mounted() {
        this.fetchStudent()
    },

    methods: {
        async fetchStudent() {
            try {
                const response = await axios.get('http://localhost:3000/student/' + String(this.$route.params.id))
                if (response.data.student_id)
                {
                    this.student = response.data
                    this.studentMajor = (await axios.get('http://localhost:3000/direction/' + String(this.student.dir_id))).data
                    this.studentLectionGroup = (await axios.get('http://localhost:3000/l_group/' + String(this.student.l_group_id))).data
                    this.studentPracticeGroup = (await axios.get('http://localhost:3000/p_group/' + String(this.student.p_group_id))).data
                    const studentAttendance = (await axios.get('http://localhost:3000/student/' + String(this.student.student_id) + '/attendance')).data.attendance
                    this.attendanceChartData = {
                        labels: ['П', 'Н'],
                        datasets: [{
                            backgroundColor: ['#41B883', '#E46651'],
                            data: [studentAttendance, 1 - studentAttendance]
                        }]
                    }
                    const studentTotalScore = (await axios.get('http://localhost:3000/student/' + String(this.student.student_id) + '/totalscore')).data.score
                    this.totalScoreChartData = {
                        labels: ['Баллы'],
                        datasets: [{
                            backgroundColor: ['#41B883', '#E46651'],
                            data: [studentTotalScore, 100 - studentTotalScore]
                        }]
                    }
                    const studentTestResult = (await axios.get('http://localhost:3000/student/' + String(this.student.student_id) + '/testresult')).data.test_result
                    this.testResultChartData = {
                        labels: ['Баллы'],
                        datasets: [{
                            backgroundColor: ['#41B883', '#E46651'],
                            data: [studentTestResult, 1 - studentTestResult]
                        }]
                    }
                    const studentPracticeScores = (await axios.get('http://localhost:3000/student/' + String(this.student.student_id) + '/practicescore')).data
                    const labels = []
                    const data = []
                    const backgroundColor = []
                    studentPracticeScores.forEach(practice => {
                        labels.push('')
                        data.push(practice.score)
                        backgroundColor.push(getRandomColor())
                    })
                    this.practiceScoresChartData = {
                        labels: labels,
                        datasets: [{
                            label: 'Баллы по практическим',
                            data: data,
                            backgroundColor: backgroundColor
                        }]
                    }

                } else
                    this.student = undefined  //student not found
            } catch (e) {
                console.log(e)
                this.student = undefined  //student not found
            }
        }
    }
}
</script>

<style scoped>
.button-back {
    margin-left: 30px;
}

.student-information {
    margin-left: 30px;
    margin-top: 15px;
    margin-bottom: 5px;
    font-weight: 500;
}
</style>