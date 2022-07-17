<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "../store/store";
const props = defineProps({
  letter: {
    type: String,
    required: true,
  },
});
const store = useStore();
const textColor = computed(() => {
  return store.darkTheme ? "text-nord4" : "text-nord3";
});
</script>

<template>
  <div
    class="flex justify-center items-center w-16 h-16 m-0.5 text-3xl"
		:class="textColor"
  >
    <div class="h-8 font-bold select-none">
      {{ props.letter }}
    </div>
  </div>
</template>
