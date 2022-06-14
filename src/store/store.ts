import { defineStore } from "pinia";
import wordList from "../data/words.json"

export const useStore = defineStore("main", {
  state: () => {
    return {
      wordList, 
    };
  },
});
