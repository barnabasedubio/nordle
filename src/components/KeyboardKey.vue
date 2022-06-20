<script setup lang="ts">
import { useStore } from "../store/store.js";

const store = useStore();
const props = defineProps({
  val: {
    type: String,
    required: true,
  },
});

function getColor(): string {
  if (store.lettersConfirmedCorrect.includes(props.val.toLowerCase())) {
    return "bg-green-400";
  }
  if (store.lettersConfirmedIncluded.includes(props.val.toLowerCase())) {
    return "bg-yellow-400";
  }
  if (store.lettersConfirmedNotIncluded.includes(props.val.toLowerCase())) {
    return "bg-gray-400";
  }
  return "";
}

function sendKey(): void {
  if (store.acceptingInputs) {
    store.sendKey(props.val);
  }
}
</script>

<template>
  <div
    @click="sendKey"
    class="p-3 border-solid border-2 border-red-500 cursor-pointer"
    :class="getColor()"
  >
    {{ props.val }}
  </div>
</template>
