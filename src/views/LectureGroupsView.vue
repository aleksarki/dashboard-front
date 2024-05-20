<template>
    <div class="main-page">
        <SideBar/>
        <div class="work-flow">
            <span class="page-title">Группы лекций</span>
            <div class="basic-list">
                <router-link
					v-for="group in lectureGroupList"
					:to="{name: 'lecture-group-info', params: {id: group.group_id}}"
                    :key="group.group_id"
                    tag="ul"
				>
					<li class="basic-list-item">{{ group.group_name }}</li>
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
            lectureGroupList: []
        }
    },

    mounted() {
        this.fetchLectureGroups()
    },

    methods: {
        async fetchLectureGroups() {
            try {
                const response = await axios.get('http://localhost:3000/l_group')
                this.lectureGroupList = response.data
            } catch (e) {
                console.log(e)
            }
        }
    }
}
</script>