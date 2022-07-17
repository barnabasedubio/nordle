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

const rowNumber = parseInt(props.row);

function getLetter(index: number): string {
  if (rowNumber < store.enteredWords.length) {
    return store.enteredWords[rowNumber][index].toUpperCase();
  }
  if (rowNumber === store.enteredWords.length) {
    return store.currentWordAsArray[index] || "";
  } else return "";
}

function matchColor(index: number): string {
  if (rowNumber < store.enteredWords.length) {
    const color: string = store.matchColors[rowNumber][index];
    if (color === "green") return "bg-nord14";
    if (color === "yellow") return "bg-nord12";
    else return store.darkTheme ?"bg-nord0 border-2 border-nord3" : "bg-nord4 border border-nord3"
  } else return store.darkTheme ? "bg-nord3" : "bg-nord4 border border-nord3";
}
</script>

<template>
  <div class="flex">
    <WordRowLetter :class="matchColor(0)" :letter="getLetter(0)" />
    <WordRowLetter :class="matchColor(1)" :letter="getLetter(1)" />
    <WordRowLetter :class="matchColor(2)" :letter="getLetter(2)" />
    <WordRowLetter :class="matchColor(3)" :letter="getLetter(3)" />
    <WordRowLetter :class="matchColor(4)" :letter="getLetter(4)" />
  </div>
</template>
