<script setup lang="ts">
import WordRow from "../components/WordRow.vue";
import Keyboard from "../components/Keyboard.vue";
import Popup from "../components/Popup.vue";
import { useStore } from "../store/store";

const store = useStore();
</script>

<template>
  <div class="mt-8">
    <Popup
      v-if="store.popupActive"
      class="absolute top-16 left-1/2 -translate-x-1/2"
    />
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
        <Keyboard />
      </div>
    </div>
  </div>
</template>
