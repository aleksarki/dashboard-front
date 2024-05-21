<template>
    <div class="main-page">
        <SideBar/>
        <div class="work-flow">
            <span class="page-title">Направления</span>
            <div class="basic-list">
                <router-link
					v-for="major in majorList"
					:to="{name: 'major-info', params: {id: major.dir_id}}"
                    :key="major.dir_id"
                    tag="ul"
				>
					<li class="basic-list-item">{{ major.dir_name }} ({{ major.studentNumber }} студ.)</li>
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
            majorList: []
        }
    },

    mounted() {
        this.fetchMajors()
    },

    methods: {
        async fetchMajors() {
            try {
                this.majorList = (await axios.get('http://localhost:3000/direction')).data
                for (const major of this.majorList) {
                    major.studentNumber = 0
                }
                const students = (await axios.get('http://localhost:3000/student')).data
                for (const student of students) {
                    student.dir_id
                    for (const major of this.majorList) {
                        if (major.dir_id == student.dir_id)
                            major.studentNumber++
                    }
                }
            } catch (e) {
                console.log(e)
            }
        }
    }
}
</script>