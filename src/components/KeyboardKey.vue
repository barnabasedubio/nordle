<script setup lang="ts">
const props = defineProps({
  val: {
    type: String,
    requred: true,
  },
});

function sendKey() {
	console.log(`sending key ${props.val}`)
}
</script>

<template>
  <div @click="sendKey" class="p-3 border-solid border-2 border-red-500 cursor-pointer">
    {{ props.val }}
  </div>
</template>
