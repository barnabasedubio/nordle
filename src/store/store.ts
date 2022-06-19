import { defineStore } from "pinia";
import validWordList from "../data/validWordList.json";
import solutionWordList from "../data/solutionWordList.json";

interface IState {
  validWordList: string[];
  solutionWordList: string[];
  todaysWord: string;
  currentWordAsArray: string[];
  enteredWords: string[];
  matchColors: string[][];
  acceptingInputs: boolean;
}

interface IWordMap {
  [letter: string]: number;
}

export const useStore = defineStore("main", {
  state: (): IState => {
    return {
      validWordList,
      solutionWordList,
      todaysWord: solutionWordList[2112],
      currentWordAsArray: [],
      enteredWords: [],
      matchColors: new Array(6)
        .fill(undefined)
        .map((x) => new Array(5).fill(" ")),
      acceptingInputs: true,
    };
  },
  getters: {
    todaysWordAsArray(state): string[] {
      return state.todaysWord.split("");
    },
    todaysWordAsMap(state): IWordMap {
      const wordMap: IWordMap = {};
      for (const letter of state.todaysWord) {
        wordMap[letter] = this.todaysWordAsArray.filter(
          (x) => x === letter
        ).length;
      }
      return wordMap;
    },
  },
  actions: {
    checkIfGameOver(): boolean {
      if (this.enteredWords.length === 6) {
        alert("Game Over!");
        this.acceptingInputs = false;
      }
      return false;
    },
    evaluateWord(enteredWord: string[]): void {
      enteredWord = enteredWord.map((letter) => letter.toLowerCase());
      const wordMap: IWordMap = { ...this.todaysWordAsMap };
      // first look for all perfect matches
      for (let i = 0; i < 5; i++) {
        if (enteredWord[i] === this.todaysWord[i]) {
          wordMap[enteredWord[i]]--;
          this.matchColors[this.enteredWords.length][i] = "green";
        }
      }
      for (let i = 0; i < 5; i++) {
        // perfect matches were already handled previously
        if (this.matchColors[this.enteredWords.length][i] === "green") continue;
        // letters not contained in solution or superfluous letters
        if (
          !wordMap.hasOwnProperty(enteredWord[i]) ||
          wordMap[enteredWord[i]] === 0
        ) {
          this.matchColors[this.enteredWords.length][i] = "gray";
        } else {
          // letters that exist in the word somewhere
          this.matchColors[this.enteredWords.length][i] = "yellow";
          wordMap[enteredWord[i]]--;
        }
      }
      this.enteredWords.push(enteredWord.join(""));
    },
    sendKey(value: string): void {
      if (value === "ENTER") {
        if (this.currentWordAsArray.length < 5) alert("not enough letters");
        else {
          const currentWord: string = this.currentWordAsArray.join("");
          if (!this.solutionWordList.includes(currentWord.toLowerCase())) {
            alert("not in word list");
            return;
          }

          this.evaluateWord(this.currentWordAsArray);
          this.checkIfGameOver();
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
