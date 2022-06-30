<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "../store/store";

const store = useStore();
const props = defineProps({
  property: {
    type: String,
    required: true,
  },
});

function getValue(property: string) {
  if (property === "hardMode") return ref(store.hardMode);
  if (property === "darkTheme") return ref(store.darkTheme);
  if (property === "highContrast") return ref(store.highContrast);
  if (property === "freePlayMode") return ref(store.freePlayMode);
  return ref(false);
}

let val = getValue(props.property);

function toggleValue(property: string): void {
  if (property === "hardMode") {
    val.value = !val.value;
    store.hardMode = val.value;
    localStorage.setItem("hardMode", JSON.stringify(val.value));
  }
  if (property === "darkTheme") {
    val.value = !val.value;
    store.darkTheme = val.value;
    localStorage.setItem("darkTheme", JSON.stringify(val.value));
  }
  if (property === "highContrast") {
    val.value = !val.value;
    store.highContrast = val.value;
    localStorage.setItem("highContrast", JSON.stringify(val.value));
  }
  if (property === "freePlayMode") {
    val.value = !val.value;
    store.freePlayMode = val.value;
    localStorage.setItem("freePlayMode", JSON.stringify(val.value));
  }
}
</script>

<template>
  <div
    @click="toggleValue(props.property)"
    :class="{ 'bg-nord14': val, 'justify-end': val, 'bg-nord0': !val }"
    class="flex w-10 h-6 p-1 rounded-xl cursor-pointer"
  >
    <div
      class="w-4 h-4 rounded-xl bg-nord4 border-solid border-2 border-nord4"
    ></div>
  </div>
</template>
