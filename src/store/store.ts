import { defineStore } from "pinia";
import validWordList from "../data/validWordList.json";
import solutionWordList from "../data/solutionWordList.json";
import {
  IWordMap,
  IGuessDistribution,
  IGameStats,
  IState,
} from "../interfaces";
// TODO make the game know what the current word should be even when deleting localstorage
export const useStore = defineStore("main", {
  state: (): IState => {
    return {
      validWordList,
      solutionWordList,
      solutionWordListIndex: 0,
      currentDateId: "",
      currentWordAsArray: localStorage.getItem("currentWordAsArray")
        ? JSON.parse(localStorage.getItem("currentWordAsArray")!)
        : [],
      enteredWords: localStorage.getItem("enteredWords")
        ? JSON.parse(localStorage.getItem("enteredWords")!)
        : [],
      matchColors: localStorage.getItem("matchColors")
        ? JSON.parse(localStorage.getItem("matchColors")!)
        : new Array(6).fill(undefined).map((x) => new Array(5).fill(" ")),
      acceptingInputs: localStorage.getItem("acceptingInputs")
        ? JSON.parse(localStorage.getItem("acceptingInputs")!)
        : true,
      lettersConfirmedCorrect: localStorage.getItem("lettersConfirmedCorrect")
        ? JSON.parse(localStorage.getItem("lettersConfirmedCorrect")!)
        : [],
      lettersConfirmedIncluded: localStorage.getItem("lettersConfirmedIncluded")
        ? JSON.parse(localStorage.getItem("lettersConfirmedIncluded")!)
        : [],
      lettersConfirmedNotIncluded: localStorage.getItem(
        "lettersConfirmedNotIncluded"
      )
        ? JSON.parse(localStorage.getItem("lettersConfirmedNotIncluded")!)
        : [],
      hardMode: localStorage.getItem("hardMode")
        ? JSON.parse(localStorage.getItem("hardMode")!)
        : false,
      darkTheme: localStorage.getItem("darkTheme")
        ? JSON.parse(localStorage.getItem("darkTheme")!)
        : true,
      highContrast: localStorage.getItem("highContrast")
        ? JSON.parse(localStorage.getItem("highContrast")!)
        : false,
      freePlayMode: localStorage.getItem("freePlayMode")
        ? JSON.parse(localStorage.getItem("freePlayMode")!)
        : false,
      gameStats: localStorage.getItem("gameStats")
        ? JSON.parse(localStorage.getItem("gameStats")!)
        : ({
            played: 0,
            wins: 0,
            losses: 0,
            currentStreak: 0,
            maxStreak: 0,
            guessDistribution: {
              one: 0,
              two: 0,
              three: 0,
              four: 0,
              five: 0,
              six: 0,
            } as IGuessDistribution,
            mostRecentGuessAmount: 0,
          } as IGameStats),
      isGameOver: localStorage.getItem("isGameOver")
        ? JSON.parse(localStorage.getItem("isGameOver")!)
        : false,
      timeUntilReset: 0, // placeholder, actual value is updated in app.vue
    };
  },
  getters: {
    todaysWord: (state): string =>
      state.solutionWordList[state.solutionWordListIndex],
    todaysWordAsArray(): string[] {
      if (this.todaysWord) {
        return this.todaysWord.split("");
      }
      return [];
    },
    todaysWordAsMap(): IWordMap {
      const wordMap: IWordMap = {};
      for (const letter of this.todaysWord) {
        wordMap[letter] = this.todaysWordAsArray.filter(
          (x) => x === letter
        ).length;
      }
      return wordMap;
    },
    numberOfEnteredWords(state): string {
      if (state.enteredWords.length === 1) return "one";
      if (state.enteredWords.length === 2) return "two";
      if (state.enteredWords.length === 3) return "three";
      if (state.enteredWords.length === 4) return "four";
      if (state.enteredWords.length === 5) return "five";
      if (state.enteredWords.length === 6) return "six";
      return "";
    },
    winPercentage(state): number {
      if (!state.gameStats.played) return 0;
      else {
        let decimal = state.gameStats.wins / state.gameStats.played;
        let value = +(Math.round(+(decimal + "e+2")) + "e-2") * 100;
        return value;
      }
    },
  },
  actions: {
    getDateOffset(date1: Date, date2: Date): number {
      const MS_PER_DAY = 1000 * 60 * 60 * 24;
      const utc1 = Date.UTC(
        date1.getFullYear(),
        date1.getMonth(),
        date1.getDate()
      );
      const utc2 = Date.UTC(
        date2.getFullYear(),
        date2.getMonth(),
        date2.getDate()
      );
      return Math.floor((utc2 - utc1) / MS_PER_DAY);
    },
    getSolutionWordIndex(): number {
      const d1 = new Date(1624101377000); //  date where original wordle began
      const d2 = new Date(Date.now());
      const currentIndex = this.getDateOffset(d1, d2);
      return currentIndex - 1;
    },
    resetInputs(): void {
      // if user didnt submit the correct word in the day, reset current streak
      if (
        !this.enteredWords.length ||
        this.enteredWords[this.enteredWords.length - 1] !== this.todaysWord
      ) {
        this.gameStats.currentStreak = 0;
      }

      this.isGameOver = false;
      localStorage.setItem("isGameOver", "false");

      this.solutionWordListIndex = this.getSolutionWordIndex();
      //localStorage.setItem(
      //  "solutionWordListIndex",
      // JSON.stringify(this.solutionWordListIndex)
      //);

      this.currentWordAsArray = [];
      localStorage.setItem("currentWordAsArray", JSON.stringify([]));

      this.enteredWords = [];
      localStorage.setItem("enteredWords", JSON.stringify([]));

      this.matchColors = new Array(6)
        .fill(undefined)
        .map((x) => new Array(5).fill(" "));
      localStorage.setItem(
        "matchColors",
        JSON.stringify(
          new Array(6).fill(undefined).map((x) => new Array(5).fill(" "))
        )
      );

      this.acceptingInputs = true;
      localStorage.setItem("acceptingInputs", "true");

      this.lettersConfirmedCorrect = [];
      localStorage.setItem("lettersConfirmedCorrect", JSON.stringify([]));

      this.lettersConfirmedIncluded = [];
      localStorage.setItem("lettersConfirmedIncluded", JSON.stringify([]));

      this.lettersConfirmedNotIncluded = [];
      localStorage.setItem("lettersConfirmedNotIncluded", JSON.stringify([]));

      this.gameStats.mostRecentGuessAmount = 0;
      localStorage.setItem("gameStats", JSON.stringify(this.gameStats));
    },
    checkIfGameOver(): boolean {
      if (
        this.enteredWords[this.enteredWords.length - 1].toLowerCase() ===
        this.todaysWord
      ) {
        this.acceptingInputs = false;
        localStorage.setItem("acceptingInputs", "false");
        alert("Nice");
        this.isGameOver = true;
        this.gameStats.played++;
        this.gameStats.wins++;
        this.gameStats.currentStreak++;
        this.gameStats.maxStreak =
          this.gameStats.currentStreak > this.gameStats.maxStreak
            ? this.gameStats.currentStreak
            : this.gameStats.maxStreak;
        this.gameStats.guessDistribution[this.numberOfEnteredWords]++;
        this.gameStats.mostRecentGuessAmount = this.enteredWords.length;
        localStorage.setItem("gameStats", JSON.stringify(this.gameStats));
        localStorage.setItem("isGameOver", JSON.stringify(this.isGameOver));
        return true;
      }
      if (this.enteredWords.length === 6) {
        this.isGameOver = true;
        this.gameStats.played++;
        this.gameStats.currentStreak = 0;
        this.acceptingInputs = false;
        localStorage.setItem("gameStats", JSON.stringify(this.gameStats));
        localStorage.setItem("acceptingInputs", "false");
        localStorage.setItem("isGameOver", JSON.stringify(this.isGameOver));
        alert("Game Over! The word was: " + this.todaysWord);
        return true;
      }
      return false;
    },
    updateLetters(enteredWord: string[], matchColor: string[]): void {
      // look at the current entered word and the current color match
      // based on that info update the lists of letters chosen
      for (let i = 0; i < enteredWord.length; i++) {
        if (matchColor[i] === "green") {
          this.lettersConfirmedCorrect.push(enteredWord[i]);
          localStorage.setItem(
            "lettersConfirmedCorrect",
            JSON.stringify(this.lettersConfirmedCorrect)
          );
        }
        if (matchColor[i] === "yellow") {
          this.lettersConfirmedIncluded.push(enteredWord[i]);
          localStorage.setItem(
            "lettersConfirmedIncluded",
            JSON.stringify(this.lettersConfirmedIncluded)
          );
        }
        if (matchColor[i] === "gray") {
          this.lettersConfirmedNotIncluded.push(enteredWord[i]);
          localStorage.setItem(
            "lettersConfirmedNotIncluded",
            JSON.stringify(this.lettersConfirmedNotIncluded)
          );
        }
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
          localStorage.setItem("matchColors", JSON.stringify(this.matchColors));
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
          localStorage.setItem("matchColors", JSON.stringify(this.matchColors));
        } else {
          // letters that exist in the word somewhere
          this.matchColors[this.enteredWords.length][i] = "yellow";
          localStorage.setItem("matchColors", JSON.stringify(this.matchColors));
          wordMap[enteredWord[i]]--;
        }
      }
      this.updateLetters(
        enteredWord,
        this.matchColors[this.enteredWords.length]
      );
      this.enteredWords.push(enteredWord.join(""));
      localStorage.setItem("enteredWords", JSON.stringify(this.enteredWords));
      return true;
    },
    sendKey(value: string): void {
      if (value === "ENTER") {
        if (this.currentWordAsArray.length < 5) alert("not enough letters");
        else {
          const currentWord = this.currentWordAsArray.join("");
          if (!this.validWordList.includes(currentWord.toLowerCase())) {
            alert("not in word list");
            return;
          }
          if (this.evaluateWord(this.currentWordAsArray)) {
            // word was successfully registered as an attempt
            this.checkIfGameOver();
            this.currentWordAsArray = [];
            localStorage.setItem(
              "currentWordAsArray",
              JSON.stringify(this.currentWordAsArray)
            );
          }
        }
      } else if (value === "DEL") {
        if (!!this.currentWordAsArray.length) {
          this.currentWordAsArray.pop();
          localStorage.setItem(
            "currentWordAsArray",
            JSON.stringify(this.currentWordAsArray)
          );
        }
      } else {
        // user typed in a valid letter
        if (this.currentWordAsArray.length === 5) return;
        this.currentWordAsArray.push(value);
        localStorage.setItem(
          "currentWordAsArray",
          JSON.stringify(this.currentWordAsArray)
        );
      }
    },
  },
});
