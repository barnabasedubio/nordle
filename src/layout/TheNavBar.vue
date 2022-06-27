<script setup lang="ts">
import TheModal from "../components/TheModal.vue";
import { ref } from "vue";

let modalActive = ref(false);
let modalType = ref("");

function activateModal(type: string): void {
  modalActive.value = true;
  modalType.value = type;
}

function closeModal(): void {
  modalActive.value = false;
}
</script>

<template>
  <TheModal v-if="modalActive" :content="modalType" @close-modal="closeModal" />
  <div class="w-full h-12 bg-nord1">
    <div
      class="container mx-auto flex flex-row justify-between items-center h-12"
    >
      <div class="flex">
        <div class="w-10">
          <a href="https://github.com/barnabasedubio/nordle" target="_blank">
            <img
              class="cursor-pointer mx-auto"
              src="../assets/github-svgrepo-com.svg"
              width="28"
              alt="GitHub"
            />
          </a>
        </div>
        <div class="w-10" @click="activateModal('help')">
          <img
            class="cursor-pointer mx-auto"
            src="../assets/help-svgrepo-com.svg"
            width="30"
            alt="Help"
          />
        </div>
      </div>

      <div class="w-24 title text-3xl text-nord4">Nordle</div>
      <div class="flex">
        <div class="w-10" @click="activateModal('stats')">
          <img
            class="cursor-pointer mx-auto"
            src="../assets/stats-svgrepo-com.svg"
            width="28"
            alt="Stats"
          />
        </div>
        <div class="w-10" @click="activateModal('settings')">
          <img
            class="cursor-pointer mx-auto"
            src="../assets/settings-svgrepo-com.svg"
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
