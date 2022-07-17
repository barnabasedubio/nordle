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

onMounted(() => {
  setTimeout(() => (store.popupActive = false), 2500);
});
</script>

<template>
  <div
    class="flex justify-center items-center h-12 px-4 border-2 z-50"
    :class="backgroundColor"
  >
    <h3 class="h-7 text-xl whitespace-nowrap" :class="textColor">
      {{ store.popupText }}
    </h3>
  </div>
</template>
