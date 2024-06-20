<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

body {
  height: 100%
}

a:link {
  text-decoration: none;
}

button {
  font-size: 25px!important;
  color: darkblue;
  border: 2px solid #124c94;
  border-radius: 15px!important;
  background-color: white;
  padding-left: 15px;
  padding-right: 15px;
	font-weight: 500;
	text-decoration: none;
	text-shadow: 1px 1px 1px lightblue;
  box-shadow: 2px 2px 5px lightgray;
}

input {
  font-size: 20px!important;
  border: 2px solid #124c94;
  border-radius: 15px!important;
  background-color: white;
  padding-left: 15px;
  padding-right: 15px;
  box-shadow: 2px 2px 5px lightgray;
  height: min-content;
}

input::placeholder {
  color: gray;
}

button:focus,
button:hover {
	color: rebeccapurple;
  border-color: rebeccapurple;
  background-color: lavender;
}

button:active {
	color:slateblue;
  border-color: slateblue;
  background-color: lavender;
}

.main-page {
  display: flex;
  height: 100%;
  background-color: #F9F7F8;
  min-height: 100vh;
}

.page-title {
  display: block;
  text-align: left;
  margin-left: 15%;
  margin-top: 20px;
  font-weight: bold;
  font-size: 30px;
  color: darkblue;
  text-shadow: 2px 2px 5px lightblue;
}

.work-flow {
  /*padding: 10px;*/
  margin: 5px;
  flex-grow: 1;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  padding: 1rem;
  margin: auto;
  height: 100%;
}

.cell {
  width: 100%;
  /*padding: 1rem;*/
  border-radius: 5%;
  height: 100%;
}

.basic-list {
  margin: 30px;
  color: darkblue;
  text-shadow: 2px 2px 3px lightblue;
}

.basic-list-item {
  list-style-type: none;
}

.button-back {
    margin-left: 30px;
}
</style>