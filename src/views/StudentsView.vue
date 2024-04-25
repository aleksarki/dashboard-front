<template>
    <div class="main-page">
        <SideBar/>
        <div class="work-flow">
            <div class="page-title">
                <span>Студенты</span>
            </div>
            <input class="student-input" v-model="studentQuery" placeholder="Имя студента">
            <div class="basic-list">
                <router-link
					v-for="student in searchedStudents"
					:to="{name: 'student-info', params: {id: student.student_id}}"
                    :key="student.student_id"
                    tag="ul"
				>
					<li class="basic-list-item">{{ student.student_name }}</li>
				</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import axios from 'axios'

export default {
    components: { SideBar },

    data() {
        return {
            studentList: [], // {student_id, student_name}
            studentQuery: ''
        }
    },

    computed: {
        searchedStudents() {
            return this.studentList.filter(student => student.student_name.toLocaleLowerCase().includes(this.studentQuery.toLocaleLowerCase()))
        }
    },

    mounted() {
        this.fetchStudents()
    },

    methods: {
        async fetchStudents() {
            try {
                const response = await axios.get('http://localhost:3000/student')
                this.studentList = response.data
            } catch (e) {
                console.log(e)
            }
        }
    }
}
</script>

<style scoped>
.student-input {
    margin-left: 20px;
    margin-top: 30px;
    width: 40%;
}
</style>