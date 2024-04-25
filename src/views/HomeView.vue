<template>
    <div class="main-page">
        <SideBar/>
        <div class="work-flow">
            <div class="page-title">
                <span>Главная</span>
            </div>
            <div class="charts-grid">
                <div class="cell">
                    <PieChart :title="'Процент посещаемости'" :data="attendanceChartData" :options="doughnutChartOptions"/>
                </div>
                <div class="cell">
                    <PieChart :title="'Процент выполнения контрольных'" :data="testResultChartData" :options="doughnutChartOptions"/>
                </div>
                <div class="cell">
                </div>
                <div class="cell">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BarChart from '@/components/BarChart.vue'
import LineChart from '@/components/LineChart.vue'
import PieChart from '@/components/PieChart.vue'
import SideBar from '@/components/SideBar.vue'
import axios from 'axios'

const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

export default {
    components: { BarChart, LineChart, PieChart, SideBar },

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

            testResultChartData: {
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
                const globalTestResult = (await axios.get('http://localhost:3000/testresult')).data.test_score
                this.testResultChartData = {
                    labels: ['Баллы'],
                    datasets: [{
                        backgroundColor: ['#41B883', '#E46651'],
                        data: [globalTestResult, 1 - globalTestResult]
                    }]
                }
            } catch (e) {
                console.log(e)
            }
        }
    }
}
</script>
