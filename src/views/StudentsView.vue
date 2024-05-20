<template>
    <div class="main-page">
        <SideBar/>
        <div class="work-flow">
            <span class="page-title">Студенты</span>
            <div class="student-search-area">
                <input v-model="studentQuery" placeholder="Имя студента">
                <div class="search-option-area">
                    <span class="search-option-label">Группа практики</span>
                    <ComboBox v-model="groupFilter" :options="groupFilterOptions"/>
                </div>
                <div class="search-option-area">
                    <span class="search-option-label">Направление</span>
                    <ComboBox v-model="majorFilter" :options="majorFilterOptions"/>
                </div>
            </div>
            <div class="basic-list">
                <router-link
					v-for="student in filteredStudents"
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
import ComboBox from '@/components/ComboBox.vue'
import SideBar from '@/components/SideBar.vue'
import axios from 'axios'

export default {
    components: { SideBar, ComboBox },

    data() {
        return {
            studentList: [], // {student_id, student_name}
            studentQuery: '',
            groupFilter: '',
            groupFilterOptions: [],
            majorFilter: '',
            majorFilterOptions: []
        }
    },

    computed: {
        searchedStudents() {
            return this.studentList.filter(student => student.student_name.toLocaleLowerCase().includes(this.studentQuery.toLocaleLowerCase()))
        },
        filteredStudents() {
            return this.searchedStudents.
            filter(student => student.p_group_id == this.groupFilter || this.groupFilter == -1).
            filter(student => student.dir_id == this.majorFilter || this.majorFilter == -1)
            
        }
    },

    mounted() {
        this.fetchGroups()
        this.fetchMajors()
        this.fetchStudents()
    },

    methods: {
        async fetchStudents() {
            try {
                const response = await axios.get('http://localhost:3000/student')
                this.studentList = response.data
                this.studentList.sort((student1, student2) => student1.student_name?.localeCompare(student2.student_name))
            } catch (e) {
                console.log(e)
            }
        },
        async fetchGroups() {
            try {
                const response = await axios.get('http://localhost:3000/p_group')
                this.groupFilterOptions.length = 0
                this.groupFilterOptions.push({value: -1, name: 'Все'})
                this.groupFilter = '-1'
                response.data.forEach(element => {
                    this.groupFilterOptions.push({value: element.group_id, name: element.group_name})
                })
            } catch (e) {
                console.log(e)
            }
        },
        async fetchMajors() {
            try {
                const response = await axios.get('http://localhost:3000/direction')
                this.majorFilterOptions.length = 0
                this.majorFilterOptions.push({value: -1, name: 'Все'})
                this.majorFilter = '-1'
                response.data.forEach(element => {
                    this.majorFilterOptions.push({value: element.dir_id, name: element.dir_name})
                })
            } catch (e) {
                console.log(e)
            }
        }
    }
}
</script>

<style scoped>
.student-search-area
{
    display: flex;
    flex-direction: column;
    margin-left: 30px;
    margin-top: 30px;
    width: 70%;
}

.search-option-area {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-top: 10px;
}

.search-option-label {
    margin-right: 10px;
}
</style>