import { defineStore } from "pinia";
import validWordList from "../data/validWordList.json";
import solutionWordList from "../data/solutionWordList.json";

interface IState {
  validWordList: string[];
  solutionWordList: string[];
  currentWordAsArray: string[];
  enteredWords: string[];
}

export const useStore = defineStore("main", {
  state: (): IState => {
    return {
      validWordList,
      solutionWordList,
      currentWordAsArray: [],
      enteredWords: [],
    };
  },
  getters: {
    todaysWord: (state) => state.solutionWordList[0],
  },
  actions: {
    evaluateWord(wordArray: string[]) {
      this.enteredWords.push(wordArray.join(""));
    },
    sendKey(value: string) {
      if (value === "ENTER") {
        if (this.currentWordAsArray.length < 5) alert("not enough letters");
        else {
          const currentWord: string = this.currentWordAsArray.join("");
          if (!this.solutionWordList.includes(currentWord.toLowerCase())) {
            alert("not in word list");
            return;
          }
		  console.log(`added ${this.currentWordAsArray.join("")} to entered words!`)
          this.evaluateWord(this.currentWordAsArray);
          this.currentWordAsArray = [];
        }
      } else if (value === "DELETE") {
        if (!!this.currentWordAsArray.length) {
          this.currentWordAsArray.pop();
        }
      } else {
        // user typed in a valid letter
        if (this.currentWordAsArray.length === 5) return;
        this.currentWordAsArray.push(value);
      }
    },
  },
});
