<script setup lang="ts">
import WordRow from "../components/WordRow.vue";
import Keyboard from "../components/Keyboard.vue";
import Popup from "../components/Popup.vue";
import { useStore } from "../store/store";
import { computed } from "vue";

const store = useStore();
const backgroundColor = computed(() => {
  return store.darkTheme ? "bg-nord0" : "bg-nord5";
});
const popupBackgroundColor = computed(() => {
  return store.darkTheme
    ? "bg-nord2 hover:bg-nord1"
    : "bg-nord5 hover:bg-nord4 border-2 border-nord3";
});
const textColor = computed(() => {
  return store.darkTheme ? "text-nord4" : "text-nord3";
});
const replayIcon = computed(() => {
  return store.darkTheme
    ? new URL("../assets/replay.svg", import.meta.url).href
    : new URL("../assets/replay-dark.svg", import.meta.url).href;
});
</script>

<template>
  <!--border required (for whatever reason) in order to prevent overflow-->
  <div class="canvas" :class="backgroundColor">
    <transition name="fade">
      <Popup
        class="absolute top-16 flex left-1/2 -translate-x-1/2"
        v-if="store.popupActive"
      />
    </transition>
    <div class="flex flex-col justify-between h-full">
      <!-- empty div needed for flex reasons -->
      <div></div>
      <div
        class="word-container-responsive-height mx-auto"
      >
        <div v-if="store.freePlayMode" class="font-bold" :class="textColor">
          Free Play Mode is active
        </div>
        <div class="flex flex-col justify-between word-row-responsive-height">
          <WordRow row="0" />
          <WordRow row="1" />
          <WordRow row="2" />
          <WordRow row="3" />
          <WordRow row="4" />
          <WordRow row="5" />
        </div>
      </div>
      <div
        v-if="store.isGameOver && store.freePlayMode"
        class="cursor-pointer flex px-4 justify-between items-center border h-14 mx-auto text-3xl text-nord4"
        :class="popupBackgroundColor"
        @click="store.playNewFreePlayGame(false)"
      >
        <h4 class="h-8" :class="textColor">PLAY AGAIN</h4>
        <img
          class="inline relative bottom-0.5 ml-2"
          :src="replayIcon"
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
@media screen and (max-height: 675px) {
  .word-container-responsive-height {
    height: 69%;
  }
	.word-row-responsive-height {
		height:90%;
	}
}
@media screen and (max-height: 500px) {

  .word-container-responsive-height {
    height: 55%;
  }
	.word-row-responsive-height {
		height:94%;
	}
}
</style>
