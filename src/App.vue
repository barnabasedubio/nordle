<script setup lang="ts">
import TheNavBar from "./layout/TheNavBar.vue";
import TheContainer from "./layout/TheContainer.vue";
import { useStore } from "./store/store.js";

document.title = "Nordle";
const store = useStore();

window.addEventListener("keydown", (e) => {
  if (!store.acceptingInputs) return;
  const validKeys = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  if (e.key === "Backspace") store.sendKey("DEL");
  else if (e.key === "Enter") store.sendKey("ENTER");
  else if (validKeys.includes(e.key)) store.sendKey(e.key.toUpperCase());
});
</script>

<template>
  <div>
    <the-nav-bar></the-nav-bar>
    <the-container></the-container>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Paytone+One&display=swap");
* {
  border: none;
  margin: 0;
  padding: 0;
}
html {
  background-color: #2e3440;
  height: 100%;
}
body {
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}
</style>
