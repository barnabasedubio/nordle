<script setup lang="ts">
import WordRow from "../components/WordRow.vue";
import Keyboard from "../components/Keyboard.vue";

</script>

<template>
  <div class="mt-8">
    <div class="flex flex-col justify-center">
      <div class="mx-auto">
        <WordRow row="0" />
        <WordRow row="1" />
        <WordRow row="2" />
        <WordRow row="3" />
        <WordRow row="4" />
        <WordRow row="5" />
      </div>
      <div class="mx-auto mt-8">
        <Keyboard/>
      </div>
    </div>
  </div>
</template>
