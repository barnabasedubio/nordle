<script setup lang="ts">
import { useStore } from "../store/store.js";

const store = useStore();
const props = defineProps({
  val: {
    type: String,
    required: true,
  },
});

function getWidth() {
	if (props.val === "ENTER" || props.val === "DEL") {
		return " max-w-18"
	} else return " w-12"
}

function getColor(): string {
  if (store.lettersConfirmedCorrect.includes(props.val.toLowerCase())) {
    return "bg-nord14";
  }
  if (store.lettersConfirmedIncluded.includes(props.val.toLowerCase())) {
    return "bg-nord12";
  }
  if (store.lettersConfirmedNotIncluded.includes(props.val.toLowerCase())) {
    return "bg-nord3";
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
    class="h-14 p-3 border-solid border-2 border-red-500 cursor-pointer m-0.5"
    :class="getColor() + getWidth()"
  >
    {{ props.val }}
  </div>
</template>
