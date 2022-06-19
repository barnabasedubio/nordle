<script setup lang="ts">
import { useStore } from "../store/store.js";

const store = useStore();
const props = defineProps({
  val: {
    type: String,
    required: true,
  },
});

function sendKey() {
	if (store.acceptingInputs) {
		store.sendKey(props.val)
	}
}
</script>

<template>
  <div
    @click="sendKey"
    class="p-3 border-solid border-2 border-red-500 cursor-pointer"
  >
    {{ props.val }}
  </div>
</template>
