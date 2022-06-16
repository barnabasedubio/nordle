<script setup lang="ts">
import { useStore } from "../store/store.js";

const store = useStore();
const props = defineProps({
  val: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div
    @click="store.sendKey(props.val)"
    class="p-3 border-solid border-2 border-red-500 cursor-pointer"
  >
    {{ props.val }}
  </div>
</template>
