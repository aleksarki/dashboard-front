import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';

import App from '@/App.vue'
import HomeView from '@/views/HomeView.vue'
import StudentsView from '@/views/StudentsView.vue'
import StudentInfoView from '@/views/StudentInfoView.vue'
import GroupsView from '@/views/GroupsView.vue'
import GroupInfoView from '@/views/GroupInfoView.vue'
import MajorsView from '@/views/MajorsView.vue'
import MajorInfoView from '@/views/MajorInfoView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

const router = createRouter({
    routes: [
        {path: '/', name: 'home', component: HomeView},
        {path: '/students', name: 'students', component: StudentsView},
        {path: '/student-info/:id', name: 'student-info', component: StudentInfoView},
        {path: '/groups-practice', name: 'groups', component: GroupsView},
        {path: '/group-practice-info/:id', name: 'group-info', component: GroupInfoView},
        //{path: '/groups-lecture', name: 'lecture-groups', component},
        {path: '/majors', name: 'majors', component: MajorsView},
        {path: '/major-info/:id', name: 'major-info', component: MajorInfoView},
        {path: '/:pathMatch(.*)*', name: '404', component: NotFoundView}
    ],
    history: createWebHistory()
})

const app = createApp(App)
app.use(router)
app.mount('#app')
