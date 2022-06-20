<script setup lang="ts">
const props = defineProps({
	letter: {
		type: String,
		required: true,
	}
})
</script>

<template>
  <div class="flex justify-center items-center w-16 h-16 m-0.5 text-nord4 text-3xl">
		<div class="h-8 font-bold select-none">
		{{ props.letter }}
		</div>
  </div>
</template>
