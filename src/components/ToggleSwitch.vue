<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "../store/store";

const store = useStore();
const props = defineProps({
  property: {
    type: String,
    required: true,
  },
  toggleable: {
    type: Boolean,
    required: true,
  },
});

function getValue(property: string) {
  if (property === "hardMode") return ref(store.hardMode);
  if (property === "darkTheme") return ref(store.darkTheme);
  if (property === "freePlayMode") return ref(store.freePlayMode);
  return ref(false);
}

let val = getValue(props.property);

function toggleValue(property: string): void {
  if (!props.toggleable) store.showPopup("Cannot change while game is active", "ERROR");
  else if (
    property === "hardMode" ||
    property === "darkTheme" ||
    property === "freePlayMode"
  ) {
    val.value = !val.value;
    store[property] = val.value;
    localStorage.setItem(property, JSON.stringify(val.value));
    if (property === "freePlayMode" && store.freePlayMode) {
      store.playNewFreePlayGame();
    }
    if (property === "freePlayMode" && !store.freePlayMode) {
      store.deactivateFreePlayMode();
    }
  }
}
</script>

<template>
  <div
    @click="toggleValue(props.property)"
    :class="{ 'bg-nord14': val, 'justify-end': val, 'bg-nord3': !val }"
    class="flex w-10 h-6 p-1 rounded-xl cursor-pointer"
  >
    <div
      class="w-4 h-4 rounded-xl bg-nord4 border-solid border-2 border-nord4"
    ></div>
  </div>
</template>
