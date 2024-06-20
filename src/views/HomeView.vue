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
                    <ApexRadialChart :title="'Выполнение контрольной №1 Управляющие конструкции'" :series="testResult1ChartSeries" :options="testResultChartOptions"/>
                </div>
                <div class="cell">
                    <ApexRadialChart :title="'Выполнение контрольной №2 Организация функций'" :series="testResult2ChartSeries" :options="testResultChartOptions"/>
                </div>
                <div class="cell">
                    <ApexRadialChart :title="'Выполнение контрольной №3 Коллекции. Работа с файлами'" :series="testResult3ChartSeries" :options="testResultChartOptions"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ApexDonutChart from '@/components/ApexDonutChart.vue'
import ApexRadialChart from '@/components/ApexRadialChart.vue'
import PieChart from '@/components/PieChart.vue'
import SideBar from '@/components/SideBar.vue'
import axios from 'axios'

const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

export default {
    components: { PieChart, SideBar, ApexDonutChart, ApexRadialChart },

    data() {
        return {
            attendanceChartOptions: {
                //xaxis: { categories: ['П', 'Н'], },
                labels: ['П', 'Н'],
                colors: ['#41B883', '#E46651'],
                chart: { width: '100%', height: '100%'}
            },

            attendanceChartSeries: [],

            testResult1ChartSeries: [],

            testResult2ChartSeries: [],

            testResult3ChartSeries: [],

            testResultChartOptions: {
                colors: ['#41B883'],
                plotOptions: {
                    radialBar: {
                        hollow: {
                            size: '70%',
                        },
                        dataLabels: {
                            name: {show: false},
                            value: {
                                fontSize: '24px',
                                offsetY: 10,
                                color: '#41B883'
                            }
                        }
                    },
                },
                chart: {
                    width: '100%',
                    height: '100%',
                    redrawOnParentResize: true,
                    redrawOnWindowResize: true
                }
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
                this.attendanceChartSeries = [average(attendances), 1 - average(attendances)]

                const globalTestResult = (await axios.get('http://localhost:3000/testresult')).data
                this.testResult1ChartSeries = [(globalTestResult.test1_score*100).toFixed(2)]
                this.testResult2ChartSeries = [(globalTestResult.test2_score*100).toFixed(2)]
                this.testResult3ChartSeries = [(globalTestResult.test3_score*100).toFixed(2)]
            } catch (e) {
                console.log(e)
            }
        }
    }
}
</script>
