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
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const timeUntilReset = 24 * 3600 - hours * 3600 - minutes * 60 - seconds - 2;
  return timeUntilReset;
}

function dateOffset(date1: Date, date2: Date) {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
  return Math.floor((utc2 - utc1) / MS_PER_DAY);
}

onMounted(() => {
  const d1 = new Date(1624101377000);
  const d2 = new Date(Date.now());
  const currentIndex = dateOffset(d1, d2);
  store.solutionWordListIndex = currentIndex - 1;

  store.timeUntilReset = getRemainingTime();
  console.log(store.todaysWord);
  setInterval(() => {
    store.timeUntilReset = getRemainingTime();
    if (store.timeUntilReset === 0) {
      store.resetInputs();
      // refreshing too soon might result in not updating the word
      setTimeout(() => window.location.reload(), 1000);
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
