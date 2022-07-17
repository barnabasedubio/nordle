<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '../store/store';

const store = useStore()
const textColor = computed(() => {
	return store.darkTheme ? "text-nord4" : "text-nord3"
})
const letterNotInWordColor = computed(() => {
	return store.darkTheme ? "bg-nord0 border-2 border-nord0": "bg-nord4 border border-nord3"
})
</script>
<template>
  <div :class="textColor">
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
        <div class="h-5 w-5" :class="letterNotInWordColor"></div>
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
      A new word will be available each day! (You can also enable Free Play
      Mode in the settings.)
    </div>
  </div>
</template>
