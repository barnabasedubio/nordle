<script setup lang="ts">
import WordRow from "../components/WordRow.vue";
import Keyboard from "../components/Keyboard.vue";
import Popup from "../components/Popup.vue";
import { useStore } from "../store/store";

const store = useStore();
</script>

<template>
  <!--border required (for whatever reason) in order to prevent overflow-->
  <div class="canvas">
    <Popup
      v-if="store.popupActive"
      class="absolute top-16 left-1/2 -translate-x-1/2"
    />
    <div class="flex flex-col justify-between h-full">
      <div></div>
      <div class="mx-auto">
        <div v-if="store.freePlayMode" class="font-bold text-nord4">
          Free Play Mode is active
        </div>
        <WordRow row="0" />
        <WordRow row="1" />
        <WordRow row="2" />
        <WordRow row="3" />
        <WordRow row="4" />
        <WordRow row="5" />
      </div>
      <div
        v-if="store.isGameOver && store.freePlayMode"
        class="cursor-pointer flex px-2 justify-between h-8 mx-auto text-3xl text-nord4"
        @click="store.playNewFreePlayGame(false)"
      >
        PLAY AGAIN
        <img
          class="inline relative left-2 bottom-1"
          src="../assets/replay-svgrepo-com.svg"
          width="32"
          alt=""
        />
      </div>
      <div v-else class="mx-auto mb-2 w-[100%] sm:w-[39.5rem]">
        <Keyboard />
      </div>
      <!-- empty div below needed for flex reasons -->
      <div v-if="store.isGameOver && store.freePlayMode"></div>
    </div>
  </div>
</template>

<style scoped>
.canvas {
  height: calc(100% - 48px);
}
</style>
