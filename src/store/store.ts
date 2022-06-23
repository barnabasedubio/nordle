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
  lettersConfirmedCorrect: string[];
  lettersConfirmedIncluded: string[];
  lettersConfirmedNotIncluded: string[];
  hardMode: boolean;
}

interface IWordMap {
  [letter: string]: number;
}

export const useStore = defineStore("main", {
  state: (): IState => {
    return {
      validWordList,
      solutionWordList,
      todaysWord: solutionWordList[372],
      currentWordAsArray: [],
      enteredWords: [],
      matchColors: new Array(6)
        .fill(undefined)
        .map((x) => new Array(5).fill(" ")),
      acceptingInputs: true,
      lettersConfirmedCorrect: [],
      lettersConfirmedIncluded: [],
      lettersConfirmedNotIncluded: [],
      hardMode: true,
    };
  },
  getters: {
    todaysWordAsArray: (state): string[] => state.todaysWord.split(""),
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
      if (
        this.currentWordAsArray.join("").toLowerCase() ===
        this.todaysWordAsArray.join("")
      ) {
        this.acceptingInputs = false;
        alert("Nice");
        return true;
      }
      if (this.enteredWords.length === 6) {
        this.acceptingInputs = false;
        alert("Game Over!");
        return true;
      }
      return false;
    },
    updateLetters(enteredWord: string[], matchColor: string[]): void {
      // look at the current entered word and the current color match
      // based on that info update the lists of letters chosen
      for (let i = 0; i < enteredWord.length; i++) {
        if (matchColor[i] === "green")
          this.lettersConfirmedCorrect.push(enteredWord[i]);
        if (matchColor[i] === "yellow")
          this.lettersConfirmedIncluded.push(enteredWord[i]);
        if (matchColor[i] === "gray")
          this.lettersConfirmedNotIncluded.push(enteredWord[i]);
      }
    },
    satisfiesHardMode(enteredWord: string[]): boolean {
      if (!this.enteredWords.length) return true;
      const previousMatchColors =
        this.matchColors[this.enteredWords.length - 1];
      for (let i = 0; i < 5; i++) {
        if (
          previousMatchColors[i] === "green" &&
          enteredWord[i] !== this.enteredWords[this.enteredWords.length - 1][i]
        )
          return false;
      }
      for (let i = 0; i < 5; i++) {
        if (
          previousMatchColors[i] === "yellow" &&
          !enteredWord.includes(
            this.enteredWords[this.enteredWords.length - 1][i]
          )
        )
          return false;
      }
      return true;
    },
    evaluateWord(enteredWord: string[]): boolean {
      enteredWord = enteredWord.map((letter) => letter.toLowerCase());
      // if hard mode is activated, make sure entered word satisfies criteria
      if (this.hardMode && !this.satisfiesHardMode(enteredWord)) {
        alert("Hard mode!");
        return false;
      }
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
      this.updateLetters(
        enteredWord,
        this.matchColors[this.enteredWords.length]
      );
      this.enteredWords.push(enteredWord.join(""));
      return true;
    },
    sendKey(value: string): void {
      if (value === "ENTER") {
        if (this.currentWordAsArray.length < 5) alert("not enough letters");
        else {
          const currentWord: string = this.currentWordAsArray.join("");
          if (!this.validWordList.includes(currentWord.toLowerCase())) {
            alert("not in word list");
            return;
          }
          if (this.evaluateWord(this.currentWordAsArray)) {
            // word was successfully registered as an attempt
            this.checkIfGameOver();
            this.currentWordAsArray = [];
          }
        }
      } else if (value === "DEL") {
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
