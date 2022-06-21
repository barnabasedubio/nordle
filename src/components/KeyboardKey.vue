<script setup lang="ts">
import { useStore } from "../store/store.js";

const store = useStore();
const props = defineProps({
  val: {
    type: String,
    required: true,
  },
	deleteKey: {
		type: Boolean,
		requred: false
	}
});

function getWidth() {
  if (props.val === "ENTER" || props.deleteKey) {
    return " max-w-18";
  } else return " w-10";
}

function getColor(): string {
  if (store.lettersConfirmedCorrect.includes(props.val.toLowerCase())) {
    return "bg-nord14";
  }
  if (store.lettersConfirmedIncluded.includes(props.val.toLowerCase())) {
    return "bg-nord12";
  }
  if (store.lettersConfirmedNotIncluded.includes(props.val.toLowerCase())) {
    return "bg-nord0";
  }
  return "bg-nord3";
}

function sendKey(): void {
  if (!store.acceptingInputs) return;
	if (props.deleteKey) store.sendKey("DEL") 
  else store.sendKey(props.val);
}
</script>

<template>
  <div
    @click="sendKey"
    class="flex justify-center items-center h-14 p-3 border-solid border-2 cursor-pointer m-0.5"
    :class="getColor() + getWidth()"
  >
    <div v-if="!props.deleteKey" class="h-5 select-none font-medium">
      {{ props.val }}
    </div>
		<div v-else>
			<img src="../assets/delete-svgrepo-com.svg" width="38" alt="Delete">
		</div>
  </div>
</template>
