<script setup lang="ts">
import { useStore } from "../store/store.js";

const store = useStore();
const props = defineProps({
  val: {
    type: String,
    required: true,
  },
  enterKey: {
    type: Boolean,
    required: false,
  },
  deleteKey: {
    type: Boolean,
    requred: false,
  },
});

function getWidth() {
  if (props.val === "ENTER" || props.deleteKey) {
    return " w-[14%]";
  } else return " w-[9%]";
}

function getColor(): string {
  if (store.lettersConfirmedCorrect.includes(props.val.toLowerCase())) {
    return "bg-nord14";
  }
  if (store.lettersConfirmedIncluded.includes(props.val.toLowerCase())) {
    return "bg-nord12";
  }
  if (store.lettersConfirmedNotIncluded.includes(props.val.toLowerCase())) {
    return store.darkTheme ? "bg-nord0" : "bg-nord3";
  }
  return store.darkTheme ? "bg-nord3" : "bg-nord4";
}

function sendKey(): void {
  if (!store.acceptingInputs) return;
  if (props.deleteKey) store.sendKey("DEL");
  else store.sendKey(props.val);
}
</script>

<template>
  <div
    @click="sendKey"
    class="flex justify-center items-center h-14 p-2 border-solid border-2 cursor-pointer m-0.5"
    :class="getColor() + getWidth()"
  >
    <div v-if="props.deleteKey" class="select-none">
      <img src="../assets/delete-svgrepo-com.svg" width="32" alt="Delete" />
    </div>
    <div v-else-if="props.enterKey" class="h-3 select-none font-medium text-xs">
      {{ props.val }}
    </div>
    <div v-else class="h-5 select-none font-medium">
      {{ props.val }}
    </div>
  </div>
</template>
