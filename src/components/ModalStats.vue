<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useStore } from "../store/store";

let interval: NodeJS.Timer;
const store = useStore();

let remainingTime = ref("");
let oneGuessPercentage = ref(0);
let twoGuessesPercentage = ref(0);
let threeGuessesPercentage = ref(0);
let fourGuessesPercentage = ref(0);
let fiveGuessesPercentage = ref(0);
let sixGuessesPercentage = ref(0);

function getMostRecentGuess(num: number): boolean {
  return store.gameStats.mostRecentGuessAmount === num;
}

function getCountDown(): string {
  let date = new Date(store.timeUntilReset * 1000);
  let hours =
    date.getUTCHours() < 10
      ? "0" + date.getUTCHours().toString()
      : date.getUTCHours().toString();
  let minutes =
    date.getUTCMinutes() < 10
      ? "0" + date.getUTCMinutes().toString()
      : date.getUTCMinutes().toString();
  let seconds =
    date.getSeconds() < 10
      ? "0" + date.getSeconds().toString()
      : date.getSeconds().toString();

  let formattedTime = `${hours}:${minutes}:${seconds}`;
  return formattedTime;
}

onMounted(() => {
  remainingTime.value = getCountDown(); // initial value without the setInterval delay
  interval = setInterval(() => {
    remainingTime.value = getCountDown();
  }, 1000);

  // calculate the relation of past guesses in order to set the guess distribution bar chart
  let array = Object.values(store.gameStats.guessDistribution);
  let mostGuessesAmount = Math.max(...array);
  let distribution = store.gameStats.guessDistribution;

  oneGuessPercentage.value = (distribution.one / mostGuessesAmount) * 100;
  twoGuessesPercentage.value = (distribution.two / mostGuessesAmount) * 100;
  threeGuessesPercentage.value = (distribution.three / mostGuessesAmount) * 100;
  fourGuessesPercentage.value = (distribution.four / mostGuessesAmount) * 100;
  fiveGuessesPercentage.value = (distribution.five / mostGuessesAmount) * 100;
  sixGuessesPercentage.value = (distribution.six / mostGuessesAmount) * 100;
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<template>
  <div class="text-nord4">
    <div class="text-center mt-2 mb-2">
      <h3 class="font-bold">STATISTICS</h3>
    </div>
    <div class="flex justify-around mt-4 h-14">
      <div class="w-16 h-full text-center">
        <h1 class="text-4xl">{{ store.gameStats.played }}</h1>
        <p class="text-xs">Played</p>
      </div>
      <div class="w-16 h-full text-center">
        <h1 class="text-4xl">{{ store.winPercentage }}</h1>
        <p class="text-xs">Win %</p>
      </div>
      <div class="w-16 h-full text-center">
        <h1 class="text-4xl">{{ store.gameStats.currentStreak }}</h1>
        <p class="text-xs">Streak</p>
      </div>
      <div class="w-16 h-full text-center">
        <h1 class="text-4xl">{{ store.gameStats.maxStreak }}</h1>
        <p class="text-xs">Record</p>
      </div>
    </div>
    <div class="mt-3 h-44">
      <h3 class="font-bold text-center">GUESS DISTRIBUTION</h3>
      <div class="h-6 flex mb-0.5 px-2">
        <p class="h-full py-px">1</p>
        <div
          :style="{ width: oneGuessPercentage + '%' }"
          :class="{
            'bg-nord14': getMostRecentGuess(1),
            'bg-nord0': !getMostRecentGuess(1),
          }"
          class="h-full min-w-[6.7%] ml-1 py-px px-2 text-right"
        >
          <p>{{ store.gameStats.guessDistribution.one }}</p>
        </div>
      </div>
      <div class="h-6 flex mb-0.5 px-2">
        <p class="h-full py-px">2</p>
        <div
          :style="{ width: twoGuessesPercentage + '%' }"
          :class="{
            'bg-nord14': getMostRecentGuess(2),
            'bg-nord0': !getMostRecentGuess(2),
          }"
          class="h-full min-w-[6.7%] ml-1 py-px px-2 text-right"
        >
          <p>{{ store.gameStats.guessDistribution.two }}</p>
        </div>
      </div>
      <div class="h-6 flex mb-0.5 px-2">
        <p class="h-full py-px">3</p>
        <div
          :style="{ width: threeGuessesPercentage + '%' }"
          :class="{
            'bg-nord14': getMostRecentGuess(3),
            'bg-nord0': !getMostRecentGuess(3),
          }"
          class="h-full min-w-[6.7%] ml-1 py-px px-2 text-right"
        >
          <p>{{ store.gameStats.guessDistribution.three }}</p>
        </div>
      </div>
      <div class="h-6 flex mb-0.5 px-2">
        <p class="h-full py-px">4</p>
        <div
          :style="{ width: fourGuessesPercentage + '%' }"
          :class="{
            'bg-nord14': getMostRecentGuess(4),
            'bg-nord0': !getMostRecentGuess(4),
          }"
          class="h-full min-w-[6.7%] ml-1 py-px px-2 text-right"
        >
          <p>{{ store.gameStats.guessDistribution.four }}</p>
        </div>
      </div>
      <div class="h-6 flex mb-0.5 px-2">
        <p class="h-full py-px">5</p>
        <div
          :style="{ width: fiveGuessesPercentage + '%' }"
          :class="{
            'bg-nord14': getMostRecentGuess(5),
            'bg-nord0': !getMostRecentGuess(5),
          }"
          class="h-full min-w-[6.7%] ml-1 py-px px-2 text-right"
        >
          <p>{{ store.gameStats.guessDistribution.five }}</p>
        </div>
      </div>
      <div class="h-6 flex mb-0.5 px-2">
        <p class="h-full py-px">6</p>
        <div
          :style="{ width: sixGuessesPercentage + '%' }"
          :class="{
            'bg-nord14': getMostRecentGuess(6),
            'bg-nord0': !getMostRecentGuess(6),
          }"
          class="h-full min-w-[6.7%] ml-1 py-px px-2 text-right"
        >
          <p>{{ store.gameStats.guessDistribution.six }}</p>
        </div>
      </div>
    </div>
    <div class="mt-3 h-16 flex justify-between">
      <div class="w-40 text-center flex items-center justify-center">
        <div class="w-full mt-1">
          <p class="text-xs font-bold">Next word in</p>
          <h1 class="text-3xl">{{ remainingTime }}</h1>
        </div>
      </div>
      <div class="h-full w-px border-solid border border-nord4"></div>
      <div class="w-40 h-full px-2 py-2 text-center">
        <button
          class="h-full w-full font-semibold text-xl bg-nord14 inline-flex items-center justify-center"
        >
          <h2 class="h-6">SHARE</h2>
        </button>
      </div>
    </div>
  </div>
</template>
