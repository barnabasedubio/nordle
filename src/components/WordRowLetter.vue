<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "../store/store";
const props = defineProps({
  letter: {
    type: String,
    required: true,
  },
});
const store = useStore();
const textColor = computed(() => {
  return store.darkTheme ? "text-nord4" : "text-nord3";
});
</script>

<template>
  <div
    class="make-letter-box-responsive flex justify-center items-center w-16 h-16 m-0.5"
    :class="textColor"
  >
    <div class="text-3xl make-letter-responsive h-8 font-bold select-none">
      {{ props.letter }}
    </div>
  </div>
</template>

<style scoped>
@media screen and (max-height: 675px) {
  .make-letter-box-responsive {
    width: 2.5rem;
    height: 2.5rem;
  }
}
@media screen and (max-height: 500px) {
  .make-letter-box-responsive {
    width: 2rem;
    height: 2rem;
  }
  .make-letter-responsive {
    font-size: 1.4rem;
  }
}
</style>
