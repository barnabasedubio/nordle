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

function getLetter(index: number) {
	const rowNumber: number = parseInt(props.row)
  if (rowNumber < store.enteredWords.length) {
		return store.enteredWords[rowNumber][index]
  }
  if (rowNumber === store.enteredWords.length) {
		return store.currentWordAsArray[index] || "";
  } 
	else return "";
}
</script>

<template>
  <div class="flex">
    <word-row-letter>{{ getLetter(0) }}</word-row-letter>
    <word-row-letter>{{ getLetter(1) }}</word-row-letter>
    <word-row-letter>{{ getLetter(2) }}</word-row-letter>
    <word-row-letter>{{ getLetter(3) }}</word-row-letter>
    <word-row-letter>{{ getLetter(4) }}</word-row-letter>
  </div>
</template>
