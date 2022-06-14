<script setup lang="ts">
import TheNavbar from "./layout/TheNavBar.vue"
import TheFooter from "./layout/TheFooter.vue"
import TheContainer from "./layout/TheContainer.vue"
</script>

<template>
<the-navbar></the-navbar>
<the-container></the-container>
<the-footer></the-footer>
</template>

<style>
* {
	border: none; 
	margin: 0;
	padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
