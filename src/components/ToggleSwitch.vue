<script setup lang="ts">
import { ref } from "vue";

let val = ref(false);

function toggleValue() {
  val.value = !val.value;
}
</script>

<template>
  <div
    @click="toggleValue"
    :class="{ 'bg-nord14': val, 'justify-end': val, 'bg-nord0': !val }"
    class="flex w-10 h-6 p-1 rounded-xl cursor-pointer"
  >
    <div
      class="w-4 h-4 rounded-xl bg-nord4 border-solid border-2 border-nord4"
    ></div>
  </div>
</template>
