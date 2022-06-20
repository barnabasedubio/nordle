<script setup lang="ts">
import TheNavBar from "./layout/TheNavBar.vue";
import TheFooter from "./layout/TheFooter.vue";
import TheContainer from "./layout/TheContainer.vue";
</script>

<template>
  <div>
    <!-- <the-nav-bar></the-nav-bar> -->
    <the-container></the-container>
    <!-- <the-footer></the-footer> -->
  </div>
</template>

<style>
* {
  border: none;
  margin: 0;
  padding: 0;
}
html {
	background-color: #2e3440
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
