<script setup lang="ts">
import WordRow from "../components/WordRow.vue";
import Keyboard from "../components/Keyboard.vue";
import Popup from "../components/Popup.vue";
import { useStore } from "../store/store";

const store = useStore();
</script>

<template>
  <!--border required (for whatever reason) in order to prevent overflow-->
  <div class="canvas border">
    <Popup
      v-if="store.popupActive"
      class="absolute top-16 left-1/2 -translate-x-1/2"
    />
    <div class="flex flex-col justify-between h-full">
      <div></div>
      <div class="mx-auto">
        <WordRow row="0" />
        <WordRow row="1" />
        <WordRow row="2" />
        <WordRow row="3" />
        <WordRow row="4" />
        <WordRow row="5" />
      </div>
      <div class="mx-auto mb-2 w-[100%] sm:w-[39.5rem]">
        <Keyboard />
      </div>
    </div>
  </div>
</template>

<style scoped>
.canvas {
  height: calc(100% - 48px);
}
</style>
