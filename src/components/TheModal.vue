<script setup lang="ts">
import ToggleSwitch from "./ToggleSwitch.vue";

const props = defineProps({
  content: {
    type: String,
    requred: true,
  },
});
const emit = defineEmits(["close-modal"]);

function closeModal() {
  console.log("close modal");
  emit("close-modal");
}
</script>

<template>
  <div class="w-full h-full absolute top-0 left-0">
    <div
      class="backdrop opacity-90 absolute w-full h-full top-0 left-0 bg-nord0"
      @click="closeModal"
    ></div>
    <div
      class="modal p-2 text-left relative z-50 w-96 h-96 mt-24 mx-auto border-solid border-2 border-nord4 bg-nord2"
    >
      <div v-if="props.content === 'help'" class="text-nord4">
        <div class="text-center mt-2 mb-2">
          <h3 class="font-bold">HOW TO PLAY</h3>
        </div>
        <div>
          <p class="mb-2">Guess the word in six tries.</p>
          <p class="mb-2">
            Each guess must be a valid 5-letter word. Hit the ENTER button to
            submit.
          </p>
          <p class="mb-2">
            After each guess, the color of the tiles will change to indicate how
            close your guess was to the word:
          </p>
        </div>
        <div>
          <div class="flex mt-4">
            <div
              class="h-5 w-5 bg-nord0 border-solid border-2 border-nord0"
            ></div>
            <p class="ml-2">The letter is not in the word.</p>
          </div>
          <div class="flex mt-4">
            <div
              class="h-5 w-5 bg-nord12 border-solid border-2 border-nord12"
            ></div>
            <p class="ml-2">The letter is in the word but at the wrong spot.</p>
          </div>
          <div class="flex mt-4 mb-4">
            <div
              class="h-5 w-5 bg-nord14 border-solid border-2 border-nord14"
            ></div>
            <p class="ml-2">The letter is in the word and at the right spot.</p>
          </div>
        </div>
        <div>
          A new word will be available each day! (You can also turn on free play
          mode in the settings.)
        </div>
      </div>
      <div v-if="props.content === 'stats'" class="text-nord4">
        <div class="text-center mt-2 mb-2">
          <h3 class="font-bold">STATISTICS</h3>
        </div>
      </div>
      <div v-if="props.content === 'settings'" class="text-nord4">
        <div class="text-center mt-2 mb-2">
          <h3 class="font-bold">SETTINGS</h3>
        </div>
        <div class="mt-9 flex justify-between items-center">
          <div>
            <h4 class="font-semibold text-sm">Hard Mode</h4>
            <p class="text-xs">
              Any revealed hints must be used in subsequent guesses.
            </p>
          </div>
          <ToggleSwitch property="hardMode" />
        </div>
        <hr class="mt-4" />
        <div class="mt-4 flex justify-between items-center">
          <div>
            <h4 class="font-semibold text-sm">Dark Theme</h4>
            <p class="text-xs">Easy on your eyes.</p>
          </div>
          <ToggleSwitch property="darkTheme"/>
        </div>
        <hr class="mt-4" />
        <div class="mt-4 flex justify-between items-center">
          <div>
            <h4 class="font-semibold text-sm">High Contrast Mode</h4>
            <p class="text-xs">For improved color vision.</p>
          </div>
          <ToggleSwitch property="highContrast"/>
        </div>
        <hr class="mt-4" />
        <div class="mt-4 flex justify-between items-center">
          <div>
            <h4 class="font-semibold text-sm">Free Play Mode</h4>
            <p class="text-xs">Play all past solutions!</p>
          </div>
          <ToggleSwitch property="freePlayMode"/>
        </div>
      </div>
    </div>
  </div>
</template>
