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
      <WordRow/>
      <WordRow/>
      <WordRow/>
      <WordRow/>
      <WordRow/>
      <WordRow/>
    </div>
		<div class="sm:mx-auto mt-8 border-solid border-2 border-blue-500">
			<Keyboard/>
		</div>
  </div>
</template>
