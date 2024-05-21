<template>
    <div class="main-page">
        <SideBar/>
        <div class="work-flow">
            <span class="page-title">Главная</span>
            <div class="charts-grid">
                <div class="cell">
                    <PieChart :title="'Процент посещаемости'" :data="attendanceChartData" :options="doughnutChartOptions"/>
                </div>
                <div class="cell">
                    <PieChart :title="'Выполнение контрольной №1'" :data="testResult1ChartData" :options="doughnutChartOptions"/>
                </div>
                <div class="cell">
                    <PieChart :title="'Выполнение контрольной №2'" :data="testResult2ChartData" :options="doughnutChartOptions"/>
                </div>
                <div class="cell">
                    <PieChart :title="'Выполнение контрольной №3'" :data="testResult3ChartData" :options="doughnutChartOptions"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PieChart from '@/components/PieChart.vue'
import SideBar from '@/components/SideBar.vue'
import axios from 'axios'

const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

export default {
    components: { PieChart, SideBar },

    data() {
        return {
            doughnutChartOptions: {
                responsive: true,
                cutout: '50%'
            },

            attendanceChartData: {
                labels: [],
                datasets: [{}]
            },

            testResult1ChartData: {
                labels: [],
                datasets: [{}]
            },

            testResult2ChartData: {
                labels: [],
                datasets: [{}]
            },

            testResult3ChartData: {
                labels: [],
                datasets: [{}]
            }
        }
    },

    mounted() {
        this.fetchData()
    },

    methods: {
        async fetchData() {
            try {
                const globalAttendanceList = (await axios.get('http://localhost:3000/attendance')).data
                const attendances = []
                globalAttendanceList.forEach(attendance => {
                    attendances.push(attendance.attendance)
                })
                this.attendanceChartData = {
                    labels: ['П', 'Н'],
                    datasets: [{
                        backgroundColor: ['#41B883', '#E46651'],
                        data: [average(attendances), 1 - average(attendances)]
                    }]
                }
                const globalTestResult = (await axios.get('http://localhost:3000/testresult')).data
                this.testResult1ChartData = {
                    labels: ['Баллы'],
                    datasets: [{
                        backgroundColor: ['#41B883', '#E46651'],
                        data: [globalTestResult.test1_score, 1 - globalTestResult.test1_score]
                    }]
                }
                this.testResult2ChartData = {
                    labels: ['Баллы'],
                    datasets: [{
                        backgroundColor: ['#41B883', '#E46651'],
                        data: [globalTestResult.test2_score, 1 - globalTestResult.test2_score]
                    }]
                }
                this.testResult3ChartData = {
                    labels: ['Баллы'],
                    datasets: [{
                        backgroundColor: ['#41B883', '#E46651'],
                        data: [globalTestResult.test3_score, 1 - globalTestResult.test3_score]
                    }]
                }
            } catch (e) {
                console.log(e)
            }
        }
    }
}
</script>
