<script setup lang="ts">
import { onUnmounted, computed } from "vue";
import { useStore } from "../store/store";
import ModalHelp from "./ModalHelp.vue";
import ModalStats from "./ModalStats.vue";
import ModalSettings from "./ModalSettings.vue";

const emit = defineEmits(["close-modal"]);
const store = useStore();
const props = defineProps({
  content: {
    type: String,
    requred: true,
  },
});
const backdropBackgroundColor = computed(() => {
  return store.darkTheme ? "bg-nord0" : "bg-nord3";
});
const modalBackgroundColor = computed(() => {
  return store.darkTheme ? "border-nord3 bg-nord2" : "border-nord3 bg-nord4";
});
const closeIconPath = computed(() => {
  return store.darkTheme
    ? new URL("../assets/close.svg", import.meta.url).href
    : new URL("../assets/close-dark.svg", import.meta.url).href;
});

function closeModal() {
  emit("close-modal");
  if (props.content === "stats") {
  }
}

// if the app currently accepts inputs, deacivate while modal is active
if (store.acceptingInputs) store.acceptingInputs = false;
onUnmounted(() => {
  if (!store.isGameOver) store.acceptingInputs = true;
});
</script>

<template>
  <div
    class="flex flex-col justify-between w-full h-full absolute top-0 left-0"
  >
    <div
      class="backdrop opacity-90 absolute w-full h-full top-0 left-0"
      :class="backdropBackgroundColor"
      @click="closeModal"
    ></div>
    <div></div>
    <div
      class="p-2 text-left relative z-50 w-[95%] sm:w-96 mx-auto border-solid border-4"
      :class="modalBackgroundColor"
    >
      <div @click="closeModal" class="absolute right-4 top-3.5 cursor-pointer">
        <img :src="closeIconPath" alt="Close modal" />
      </div>
      <ModalHelp v-if="props.content === 'help'" />
      <ModalStats v-if="props.content === 'stats'" />
      <ModalSettings v-if="props.content === 'settings'" />
    </div>
    <div></div>
  </div>
</template>

<style scoped></style>
