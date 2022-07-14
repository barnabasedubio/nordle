<script setup lang="ts">
import ToggleSwitch from "./ToggleSwitch.vue";
import { useStore } from "../store/store";

const store = useStore()
const gameNotActive = store.isGameOver || store.enteredWords.length === 0 
</script>

<template>
  <div class="text-nord4">
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
      <ToggleSwitch property="hardMode" :toggleable="gameNotActive"/>
    </div>
    <hr class="mt-4" />
    <div class="mt-4 flex justify-between items-center">
      <div>
        <h4 class="font-semibold text-sm">Dark Theme</h4>
        <p class="text-xs">Easy on your eyes.</p>
      </div>
      <ToggleSwitch property="darkTheme" :toggleable="true"/>
    </div>
    <hr class="mt-4" />
    <div class="mt-4 flex justify-between items-center">
      <div>
        <h4 class="font-semibold text-sm">High Contrast Mode</h4>
        <p class="text-xs">For improved color vision.</p>
      </div>
      <ToggleSwitch property="highContrast" :toggleable="true"/>
    </div>
    <hr class="mt-4" />
    <div class="mt-4 flex justify-between items-center">
      <div>
        <h4 class="font-semibold text-sm">Free Play Mode</h4>
        <p class="text-xs">Play all past solutions!</p>
      </div>
      <ToggleSwitch property="freePlayMode" :toggleable="gameNotActive"/>
    </div>
    <p class="text-xs mt-1">
      (Your performance in Free Play Mode does not affect your statistics.)
    </p>
  </div>
</template>
