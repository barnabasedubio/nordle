<script setup lang="ts">
import { onMounted } from "vue";
import TheNavBar from "./layout/TheNavBar.vue";
import TheContainer from "./layout/TheContainer.vue";
import { useStore } from "./store/store";

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
// countdown until next day
function getRemainingTime(): number {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let timeUntilReset = 24 * 3600 - hours * 3600 - minutes * 60 - seconds - 2;
  return timeUntilReset;
}

onMounted(() => {
  let remainingTime = 60;
  store.timeUntilReset = remainingTime;
  console.log(store.todaysWord);
  setInterval(() => {
    remainingTime--;
    if (remainingTime < 0) remainingTime = 60;
    store.timeUntilReset = remainingTime;
    //console.log(store.timeUntilReset);
    if (store.timeUntilReset === 0) {
      store.resetInputs();
      window.location.reload();
    }
  }, 1000);
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
