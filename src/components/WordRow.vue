<script setup lang="ts">
import WordRowLetter from "./WordRowLetter.vue";
import { useStore } from "../store/store.js";

const store = useStore();
const props = defineProps({
  row: {
    type: String,
    required: true,
  },
});

const rowNumber: number = parseInt(props.row);

function getLetter(index: number) {
  if (rowNumber < store.enteredWords.length) {
    return store.enteredWords[rowNumber][index].toUpperCase();
  }
  if (rowNumber === store.enteredWords.length) {
    return store.currentWordAsArray[index] || "";
  } else return "";
}

function matchColor(index: number) {
  if (rowNumber < store.enteredWords.length) {
    const color: string = store.matchColors[rowNumber][index];
    if (color === "green") return "bg-green-300";
    if (color === "yellow") return "bg-yellow-300";
    else return "bg-gray-400";
  } else return "bg-gray-400";
}
</script>

<template>
  <div class="flex">
    <word-row-letter :class="matchColor(0)">{{ getLetter(0) }}</word-row-letter>
    <word-row-letter :class="matchColor(1)">{{ getLetter(1) }}</word-row-letter>
    <word-row-letter :class="matchColor(2)">{{ getLetter(2) }}</word-row-letter>
    <word-row-letter :class="matchColor(3)">{{ getLetter(3) }}</word-row-letter>
    <word-row-letter :class="matchColor(4)">{{ getLetter(4) }}</word-row-letter>
  </div>
</template>
