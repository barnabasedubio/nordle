<script setup lang="ts">
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
      class="modal relative z-50 w-96 h-96 mt-24 mx-auto border-solid border-2 border-nord4 bg-nord2"
    >
      <div>
        <p>Guess the word in six tries</p>
        <p>
          Each guess must be a valid 5-letter word. Hit the enter button to
          submit.
        </p>
        <p>
          After each guess, the color of the tiles will change to indicate how
          close your guess was to the word.
        </p>
      </div>
      <div>examples here</div>
      <div>
        A new word will be available each day (or you can turn on free play mode
        in the settings)!
      </div>
    </div>
  </div>
</template>
