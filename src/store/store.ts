import { defineStore } from "pinia";
import validWordList from "../data/validWordList.json"
import solutionWordList from "../data/solutionWordList.json"

export const useStore = defineStore("main", {
  state: () => {
    return {
		validWordList, 
		solutionWordList,
		usedWords: [],
		todaysWord: solutionWordList[0],
    };
  },
});
