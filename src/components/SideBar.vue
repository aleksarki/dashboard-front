<template>
	<div class="side-bar">
		<div class="side-bar-title">
			<span>Dashboard</span>
		</div>
		<div class="menu">
			<ul class="menu-list">
				<router-link
					v-for="link in links"
					:key="link.to"
					:to="link.to"
					active-class="current-item"
				>
					<li>{{ link.title }}</li>
				</router-link>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SideBar',
	data() {
		return {
			links: [
				{title: 'Главная', to: {name: 'home'}},
				{title: 'Студенты', to: {name: 'students'}},
				{title: 'Группы (практика)', to: {name: 'groups'}},
				{title: 'Направления', to: {name: 'majors'}}
			]
		}
	}
}
</script>

<style scoped>
.side-bar {
  width: 200px;
  background-color:#DAE2EF;
  border-radius: 15px;
  margin: 5px;
  
}

.side-bar-title {
  display: block;
  text-align: center;
  margin: 20px;
  font-weight: bold;
  text-shadow: 1px 1px 3px gray;
}

.menu {
  text-align: center;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.current-item {
	color: slateblue!important;
}

a:link {
	color: #124c94;
	font-weight: 500;
	text-decoration: none;
	text-shadow: 1px 1px 1px lightblue;
}

a:visited {
	color: #124c94;
}

a:focus,
a:hover {
	color: rebeccapurple;
}

a:active {
	color:slateblue;
}
</style>