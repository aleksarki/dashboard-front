<template>
    <div class="main-page">
        <SideBar/>
        <div class="work-flow">
            <div class="page-title">
                <span>Направления</span>
            </div>
            <div class="basic-list">
                <router-link
					v-for="major in majorList"
					:to="{name: 'major-info', params: {id: major.dir_id}}"
                    :key="major.dir_id"
                    tag="ul"
				>
					<li class="basic-list-item">{{ major.dir_name }}</li>
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
                const response = await axios.get('http://localhost:3000/direction')
                this.majorList = response.data
            } catch (e) {
                console.log(e)
            }
        }
    }
}
</script>