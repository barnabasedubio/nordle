<script setup lang="ts">
import TheNavBar from "./layout/TheNavBar.vue";
import TheContainer from "./layout/TheContainer.vue";

document.title = "Nordle";
</script>

<template>
  <div>
    <the-nav-bar></the-nav-bar>
    <the-container></the-container>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Paytone+One&display=swap');
* {
  border: none;
  margin: 0;
  padding: 0;
}
html {
  background-color: #2e3440;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
