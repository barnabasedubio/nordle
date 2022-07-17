<script setup lang="ts">
import { onMounted } from "vue";
import TheNavBar from "./layout/TheNavBar.vue";
import TheContainer from "./layout/TheContainer.vue";
import { useStore } from "./store/store";

document.title = "Nordle";
const store = useStore();

window.addEventListener("keydown", (e) => {
  if (!store.acceptingInputs) {
    if (store.freePlayMode && store.isGameOver && e.key === "Enter") {
      store.playNewFreePlayGame(false);
      return;
    } else return;
  }
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

// e.g: returns "2022712 for 12. July 2022"
// remote UTC part to remaing local
function getCurrentDateId(): string {
  const date = new Date(Date.now());
  return `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`;
}

onMounted(() => {
  store.solutionWordListIndex = store.getSolutionWordIndex();
  store.timeUntilReset = getRemainingTime();

  if (!localStorage.getItem("currentDateId")) {
    store.resetInputs();
    localStorage.setItem("currentDateId", getCurrentDateId());
    store.activateModal("help");
  } else if (localStorage.getItem("currentDateId") !== getCurrentDateId()) {
    store.resetInputs();
    localStorage.setItem("currentDateId", getCurrentDateId());
  }
  // if the game is over and the use did not guess the word, display popup
  if (store.isGameOver) {
    if (
      store.enteredWords[store.enteredWords.length - 1] !== store.todaysWord
    ) {
      store.showPopup("The word was: " + store.todaysWord.toUpperCase());
      setTimeout(() => store.activateModal("stats"), 2500);
    } else {
      setTimeout(() => store.activateModal("stats"), 1000);
    }
  }
  setInterval(() => {
    store.timeUntilReset = getRemainingTime();
    if (localStorage.getItem("currentDateId") !== getCurrentDateId()) {
      if (!localStorage.getItem("gameStats")) store.resetInputs(true);
      else store.resetInputs();
      localStorage.setItem("currentDateId", getCurrentDateId());
    }
  }, 1000);
});
</script>

<template>
  <div class="h-full">
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
