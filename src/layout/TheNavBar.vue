<script setup lang="ts">
import TheModal from "../components/TheModal.vue";
import { useStore } from "../store/store";
import { computed } from "vue";

const store = useStore();
const backgroundColor = computed(() => {
  return store.darkTheme ? "bg-nord1" : "bg-nord4";
});
const textColor = computed(() => {
  return store.darkTheme ? "text-nord4" : "text-nord3";
});
function closeModal(): void {
  store.showModal = false;
}

// svg paths
const githubIconPath = computed(() => {
  return store.darkTheme
    ? new URL("../assets/github.svg", import.meta.url).href
    : new URL("../assets/github-dark.svg", import.meta.url).href;
});
const helpIconPath = computed(() => {
  return store.darkTheme
    ? new URL("../assets/help.svg", import.meta.url).href
    : new URL("../assets/help-dark.svg", import.meta.url).href;
});
const statsIconPath = computed(() => {
  return store.darkTheme
    ? new URL("../assets/stats.svg", import.meta.url).href
    : new URL("../assets/stats-dark.svg", import.meta.url).href;
});
const settingsIconPath = computed(() => {
  return store.darkTheme
    ? new URL("../assets/settings.svg", import.meta.url).href
    : new URL("../assets/settings-dark.svg", import.meta.url).href;
});
</script>

<template>
  <TheModal
    v-if="store.showModal"
    :content="store.modalType"
    @close-modal="closeModal"
  />
  <div class="w-full h-12" :class="backgroundColor">
    <div
      class="container mx-auto flex flex-row justify-between items-center h-12"
    >
      <div class="flex">
        <div class="w-10">
          <a href="https://github.com/barnabasedubio/nordle" target="_blank">
            <img
              class="cursor-pointer mx-auto"
              width="28"
              :src="githubIconPath"
              alt="GitHub"
            />
          </a>
        </div>
        <div class="w-10" @click="store.activateModal('help')">
          <img
            class="cursor-pointer mx-auto"
            :src="helpIconPath"
            width="30"
            alt="Help"
          />
        </div>
      </div>

      <div class="w-24 title text-3xl" :class="textColor">Nordle</div>
      <div class="flex">
        <div class="w-10" @click="store.activateModal('stats')">
          <img
            class="cursor-pointer mx-auto"
            :src="statsIconPath"
            width="28"
            alt="Stats"
          />
        </div>
        <div class="w-10" @click="store.activateModal('settings')">
          <img
            class="cursor-pointer mx-auto"
            :src="settingsIconPath"
            width="28"
            alt="Settings"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-family: "Paytone One";
}
</style>
