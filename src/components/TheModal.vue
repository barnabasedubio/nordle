<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useStore } from "../store/store";
import ToggleSwitch from "./ToggleSwitch.vue";

const props = defineProps({
  content: {
    type: String,
    requred: true,
  },
});

const store = useStore();
let interval: NodeJS.Timer;
let remainingTime = ref("");

const emit = defineEmits(["close-modal"]);

function closeModal() {
  emit("close-modal");
  if (props.content === "stats") {
    clearInterval(interval);
  }
}

function getCountDown(): string {
  let date = new Date();
  let hours: number | string = date.getHours();
  let minutes: number | string = date.getMinutes();
  let seconds: number | string = date.getSeconds();

  let timeUntilReset = 24 * 3600 - hours * 3600 - minutes * 60 - seconds - 1;
  date = new Date(timeUntilReset * 1000);
  hours =
    date.getHours() < 10
      ? "0" + date.getHours().toString()
      : date.getHours().toString();
  minutes =
    date.getMinutes() < 10
      ? "0" + date.getMinutes().toString()
      : date.getMinutes().toString();
  seconds =
    date.getSeconds() < 10
      ? "0" + date.getSeconds().toString()
      : date.getSeconds().toString();

  let formattedTime = `${hours}:${minutes}:${seconds}`;
  return formattedTime;
}
onMounted(() => {
  if (props.content === "stats") {
    remainingTime.value = getCountDown(); // initial value without the setInterval delay
    interval = setInterval(() => {
      remainingTime.value = getCountDown();
    }, 1000);

		// calculate the relation of past guesses in order to set the guess distribution bar chart

  }
});
</script>

<template>
  <div class="w-full h-full absolute top-0 left-0">
    <div
      class="backdrop opacity-90 absolute w-full h-full top-0 left-0 bg-nord0"
      @click="closeModal"
    ></div>
    <div
      class="modal p-2 text-left relative z-50 w-96 h-96 mt-24 mx-auto border-solid border-2 border-nord4 bg-nord2"
    >
      <div @click="closeModal" class="absolute right-4 top-3.5 cursor-pointer">
        <img src="../assets/close-svgrepo-com.svg" alt="Close modal" />
      </div>
      <div v-if="props.content === 'help'" class="text-nord4">
        <div class="text-center mt-2 mb-2">
          <h3 class="font-bold">HOW TO PLAY</h3>
        </div>
        <div>
          <p class="mb-2">Guess the word in six tries.</p>
          <p class="mb-2">
            Each guess must be a valid 5-letter word. Hit the ENTER button to
            submit.
          </p>
          <p class="mb-2">
            After each guess, the color of the tiles will change to indicate how
            close your guess was to the word:
          </p>
        </div>
        <div>
          <div class="flex mt-4">
            <div
              class="h-5 w-5 bg-nord0 border-solid border-2 border-nord0"
            ></div>
            <p class="ml-2">The letter is not in the word.</p>
          </div>
          <div class="flex mt-4">
            <div
              class="h-5 w-5 bg-nord12 border-solid border-2 border-nord12"
            ></div>
            <p class="ml-2">The letter is in the word but at the wrong spot.</p>
          </div>
          <div class="flex mt-4 mb-4">
            <div
              class="h-5 w-5 bg-nord14 border-solid border-2 border-nord14"
            ></div>
            <p class="ml-2">The letter is in the word and at the right spot.</p>
          </div>
        </div>
        <div>
          A new word will be available each day! (You can also turn on Free Play
          Mode in the settings.)
        </div>
      </div>
      <div v-if="props.content === 'stats'" class="text-nord4">
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
          <div class="h-6 flex mb-0.5">
            <p class="h-full py-px">1</p>
            <div class="h-full ml-1 py-px px-2 bg-nord0">
              <p>{{ store.gameStats.guessDistribution.one }}</p>
            </div>
          </div>
          <div class="h-6 flex mb-0.5">
            <p class="h-full py-px">2</p>
            <div class="h-full ml-1 py-px px-2 bg-nord0">
              <p>{{ store.gameStats.guessDistribution.two }}</p>
            </div>
          </div>
          <div class="h-6 flex mb-0.5">
            <p class="h-full py-px">3</p>
            <div class="h-full ml-1 py-px px-2 bg-nord0">
              <p>{{ store.gameStats.guessDistribution.three }}</p>
            </div>
          </div>
          <div class="h-6 flex mb-0.5">
            <p class="h-full py-px">4</p>
            <div class="h-full ml-1 py-px px-2 bg-nord0">
              <p>{{ store.gameStats.guessDistribution.four }}</p>
            </div>
          </div>
          <div class="h-6 flex mb-0.5">
            <p class="h-full py-px">5</p>
            <div class="h-full ml-1 py-px px-2 bg-nord0">
              <p>{{ store.gameStats.guessDistribution.five }}</p>
            </div>
          </div>
          <div class="h-6 flex mb-0.5">
            <p class="h-full py-px">6</p>
            <div class="h-full ml-1 py-px px-2 bg-nord0">
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
      <div v-if="props.content === 'settings'" class="text-nord4">
        <div class="text-center mt-2 mb-2">
          <h3 class="font-bold">SETTINGS</h3>
        </div>
        <div class="mt-9 flex justify-between items-center">
          <div>
            <h4 class="font-semibold text-sm">Hard Mode</h4>
            <p class="text-xs">
              Any revealed hints must be used in subsequent guesses.
            </p>
          </div>
          <ToggleSwitch property="hardMode" />
        </div>
        <hr class="mt-4" />
        <div class="mt-4 flex justify-between items-center">
          <div>
            <h4 class="font-semibold text-sm">Dark Theme</h4>
            <p class="text-xs">Easy on your eyes.</p>
          </div>
          <ToggleSwitch property="darkTheme" />
        </div>
        <hr class="mt-4" />
        <div class="mt-4 flex justify-between items-center">
          <div>
            <h4 class="font-semibold text-sm">High Contrast Mode</h4>
            <p class="text-xs">For improved color vision.</p>
          </div>
          <ToggleSwitch property="highContrast" />
        </div>
        <hr class="mt-4" />
        <div class="mt-4 flex justify-between items-center">
          <div>
            <h4 class="font-semibold text-sm">Free Play Mode</h4>
            <p class="text-xs">Play all past solutions!</p>
          </div>
          <ToggleSwitch property="freePlayMode" />
        </div>
        <p class="text-xs mt-1">
          (Your preformance in Free Play Mode does not affect your statistics.)
        </p>
      </div>
    </div>
  </div>
</template>
