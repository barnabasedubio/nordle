<script setup lang="ts">
const props = defineProps({
	letter: {
		type: String,
		required: true,
	}
})
</script>

<template>
  <div class="w-16 h-16 border-solid border-2 border-red-400">
		{{ props.letter }}
  </div>
</template>
