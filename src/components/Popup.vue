<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useStore } from "../store/store";

const store = useStore();
const backgroundColor = computed(() => {
  return store.darkTheme ? "border-nord4 bg-nord1" : "border-nord3 bg-nord5";
});
const textColor = computed(() => {
  return store.darkTheme ? "text-nord4" : "text-nord3";
});

const animationType = store.popupType

onMounted(() => {
  setTimeout(() => {
    store.popupActive = false;
    store.popupType = "INFO";
  }, 2000);
});
</script>

<template>
  <div
    class="justify-center items-center h-12 px-4 border-2 z-50"
    :class="[backgroundColor, animationType]"
  >
    <h3 class="h-7 text-xl whitespace-nowrap" :class="textColor">
      {{ store.popupText }}
    </h3>
  </div>
</template>

<style scoped>
.ERROR {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translateX(-50%);
}

@keyframes shake {
  10%,
  90% {
    transform: translateX(-51%);
  }

  20%,
  80% {
    transform: translateX(-49%);
  }

  30%,
  50%,
  70% {
    transform: translateX(-54%);
  }

  40%,
  60% {
    transform: translateX(-46%);
  }
}
</style>
