<script setup lang="ts">
import { onMounted } from "vue";
import { useStore } from "../store/store";

const store = useStore();

onMounted(() => {
  setTimeout(() => (store.popupActive = false), 2500);
});
</script>

<template>
  <div class="flex justify-center items-center min-w-48 h-12 px-4 border-2 border-nord4 bg-nord1 z-50">
		<h3 class="h-7 text-nord4 text-xl">{{ store.popupText }}</h3>
	</div>
</template>
