<script setup lang="ts">
import { useStore } from "../store/store.js";
import WordRow from "../components/WordRow.vue";
import Keyboard from "../components/Keyboard.vue"

const store = useStore();
const testValue: String = store.todaysWord.toUpperCase();
</script>

<template>
  {{ testValue }}
  <div class="flex flex-col justify-center">
    <div class="sm:mx-auto border-solid border-2 border-blue-500">
      <WordRow row="0"/>
      <WordRow row="1"/>
      <WordRow row="2"/>
      <WordRow row="3"/>
      <WordRow row="4"/>
      <WordRow row="5"/>
    </div>
		<div v-if="store.acceptingInputs" class="sm:mx-auto mt-8 border-solid border-2 border-blue-500">
			<Keyboard/>
		</div>
  </div>
</template>
