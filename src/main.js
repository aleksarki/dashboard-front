import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from '@/App.vue'
import HomeView from '@/views/HomeView.vue'
import StudentsView from '@/views/StudentsView.vue'
import StudentInfoView from '@/views/StudentInfoView.vue'
import PracticeGroupsView from '@/views/PracticeGroupsView.vue'
import PracticeGroupInfoView from '@/views/PracticeGroupInfoView.vue'
import LectureGroupsView from './views/LectureGroupsView.vue'
import LectureGroupInfoView from './views/LectureGroupInfoView.vue'
import MajorsView from '@/views/MajorsView.vue'
import MajorInfoView from '@/views/MajorInfoView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import VueApexCharts from "vue3-apexcharts"

const router = createRouter({
    routes: [
        {path: '/', name: 'home', component: HomeView},
        {path: '/students', name: 'students', component: StudentsView},
        {path: '/student-info/:id', name: 'student-info', component: StudentInfoView},
        {path: '/practice-groups', name: 'practice-groups', component: PracticeGroupsView},
        {path: '/practice-group-info/:id', name: 'practice-group-info', component: PracticeGroupInfoView},
        {path: '/lecture-groups', name: 'lecture-groups', component: LectureGroupsView},
        {path: '/lecture-group-info/:id', name: 'lecture-group-info', component: LectureGroupInfoView},
        {path: '/majors', name: 'majors', component: MajorsView},
        {path: '/major-info/:id', name: 'major-info', component: MajorInfoView},
        {path: '/:pathMatch(.*)*', name: '404', component: NotFoundView}
    ],
    history: createWebHistory()
})

const app = createApp(App)
app.use(router)
app.use(VueApexCharts)
app.mount('#app')
