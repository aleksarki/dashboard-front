<template>
    <div class="main-page">
        <SideBar/>
        <div class="work-flow">
            <span class="page-title">Главная</span>
            <div class="charts-grid">
                <div class="cell">
                    <ApexDonutChart :title="'Процент посещаемости'" :series="attendanceChartSeries" :options="attendanceChartOptions"/>
                </div>
                <div class="cell">
                    <ApexDonutChart :title="'Выполнение контрольной №1'" :series="testResult1ChartSeries" :options="testResultChartOptions"/>
                </div>
                <div class="cell">
                    <ApexDonutChart :title="'Выполнение контрольной №2'" :series="testResult2ChartSeries" :options="testResultChartOptions"/>
                </div>
                <div class="cell">
                    <ApexDonutChart :title="'Выполнение контрольной №3'" :series="testResult3ChartSeries" :options="testResultChartOptions"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ApexDonutChart from '@/components/ApexDonutChart.vue'
import PieChart from '@/components/PieChart.vue'
import SideBar from '@/components/SideBar.vue'
import axios from 'axios'

const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

export default {
    components: { PieChart, SideBar, ApexDonutChart },

    data() {
        return {
            attendanceChartOptions: {
                //xaxis: { categories: ['П', 'Н'], },
                labels: ['П', 'Н'],
                colors: ['#41B883', '#E46651']
            },

            attendanceChartSeries: [],

            testResultChartOptions: {
                labels: ['1', '2'],
                colors: ['#41B883', '#E46651'],
                legend: { show: false },
                chart: { width: '100%', height: '100%'}
            },

            testResult1ChartSeries: [],

            testResult2ChartSeries: [],

            testResult3ChartSeries: []
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
                this.attendanceChartSeries = [average(attendances), 1 - average(attendances)]

                const globalTestResult = (await axios.get('http://localhost:3000/testresult')).data
                this.testResult1ChartSeries = [globalTestResult.test1_score, 1 - globalTestResult.test1_score]
                this.testResult2ChartSeries = [globalTestResult.test2_score, 1 - globalTestResult.test2_score]
                this.testResult3ChartSeries = [globalTestResult.test3_score, 1 - globalTestResult.test3_score]
            } catch (e) {
                console.log(e)
            }
        }
    }
}
</script>
