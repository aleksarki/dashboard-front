<template>
    <div class="main-page">
        <SideBar/>
        <div class="work-flow">
            <div class="page-title">
                <span>Группы практики</span>
            </div>
            <div class="basic-list">
                <router-link
					v-for="group in practiceGroupList"
					:to="{name: 'practice-group-info', params: {id: group.group_id}}"
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
            practiceGroupList: []
        }
    },

    mounted() {
        this.fetchPracticeGroups()
    },

    methods: {
        async fetchPracticeGroups() {
            try {
                const response = await axios.get('http://localhost:3000/p_group')
                this.practiceGroupList = response.data
            } catch (e) {
                console.log(e)
            }
        }
    }
}
</script>