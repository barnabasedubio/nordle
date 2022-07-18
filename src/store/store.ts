import { defineStore, storeToRefs } from "pinia";
import validWordList from "../data/validWordList.json";
import solutionWordList from "../data/solutionWordList.json";
import {
  IWordMap,
  IGuessDistribution,
  IGameStats,
  IState,
} from "../interfaces";
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
        : false,
      freePlayMode: false,
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
      popupActive: false,
      popupText: "Some test text here!",
      popupType: "INFO",
      showModal: false,
      modalType: "",
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
    playNewFreePlayGame(firstTime: boolean = true): void {
      // reset inputs in the store (not localstorage)
      if (firstTime) {
        this.showPopup("Activated Free Play Mode", "INFO");
      }
      this.isGameOver = false;
      this.currentWordAsArray = [];
      this.enteredWords = [];
      this.matchColors = new Array(6)
        .fill(undefined)
        .map((x) => new Array(5).fill(" "));
      this.acceptingInputs = true;
      this.lettersConfirmedCorrect = [];
      this.lettersConfirmedIncluded = [];
      this.lettersConfirmedNotIncluded = [];

      // return a random day and check if the day has been solved in FPM already
      let randomDay = Math.floor(
        Math.random() * this.solutionWordListIndex - 1
      );
      this.solutionWordListIndex = randomDay;
    },
    deactivateFreePlayMode(): void {
      this.showPopup("Deactivated Free Play Mode", "INFO");
      // restore inputs from localstorage if exists
      this.currentWordAsArray = localStorage.getItem("currentWordAsArray")
        ? JSON.parse(localStorage.getItem("currentWordAsArray")!)
        : [];
      this.enteredWords = localStorage.getItem("enteredWords")
        ? JSON.parse(localStorage.getItem("enteredWords")!)
        : [];
      this.matchColors = localStorage.getItem("matchColors")
        ? JSON.parse(localStorage.getItem("matchColors")!)
        : new Array(6).fill(undefined).map((x) => new Array(5).fill(" "));
      this.acceptingInputs = localStorage.getItem("acceptingInputs")
        ? JSON.parse(localStorage.getItem("acceptingInputs")!)
        : true;
      this.lettersConfirmedCorrect = localStorage.getItem(
        "lettersConfirmedCorrect"
      )
        ? JSON.parse(localStorage.getItem("lettersConfirmedCorrect")!)
        : [];
      this.lettersConfirmedIncluded = localStorage.getItem(
        "lettersConfirmedIncluded"
      )
        ? JSON.parse(localStorage.getItem("lettersConfirmedIncluded")!)
        : [];
      this.lettersConfirmedNotIncluded = localStorage.getItem(
        "lettersConfirmedNotIncluded"
      )
        ? JSON.parse(localStorage.getItem("lettersConfirmedNotIncluded")!)
        : [];
      this.isGameOver = localStorage.getItem("isGameOver")
        ? JSON.parse(localStorage.getItem("isGameOver")!)
        : false;

      this.solutionWordListIndex = this.getSolutionWordIndex();
    },
    saveToLocalStorage(key: string, value: any): void {
      if (this.freePlayMode) return;
      else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    },
    activateModal(type: string): void {
      this.showModal = true;
      this.modalType = type;
    },
    showPopup(text: string, type: "ERROR" | "INFO"): void {
      this.popupActive = true;
      this.popupText = text;
      this.popupType = type;
    },
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
    resetInputs(resetGameStats: boolean = false): void {
      // if user didnt submit the correct word in the day, reset current streak
      if (
        !this.enteredWords.length ||
        this.enteredWords[this.enteredWords.length - 1] !== this.todaysWord
      ) {
        this.gameStats.currentStreak = 0;
      }

      this.freePlayMode = false;

      this.isGameOver = false;
      this.saveToLocalStorage("isGameOver", false);

      this.currentWordAsArray = [];
      this.saveToLocalStorage("currentWordAsArray", []);

      this.enteredWords = [];
      this.saveToLocalStorage("enteredWords", []);

      this.matchColors = new Array(6)
        .fill(undefined)
        .map((x) => new Array(5).fill(" "));
      this.saveToLocalStorage(
        "matchColors",
        new Array(6).fill(undefined).map((x) => new Array(5).fill(" "))
      );

      this.acceptingInputs = true;
      this.saveToLocalStorage("acceptingInputs", true);

      this.lettersConfirmedCorrect = [];
      this.saveToLocalStorage("lettersConfirmedCorrect", []);

      this.lettersConfirmedIncluded = [];
      this.saveToLocalStorage("lettersConfirmedIncluded", []);

      this.lettersConfirmedNotIncluded = [];
      this.saveToLocalStorage("lettersConfirmedNotIncluded", []);

      if (resetGameStats) {
        this.gameStats = {
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
        } as IGameStats;
      } else this.gameStats.mostRecentGuessAmount = 0;

      this.saveToLocalStorage("gameStats", this.gameStats);

      this.solutionWordListIndex = this.getSolutionWordIndex();
      this.saveToLocalStorage(
        "solutionWordListIndex",
        this.solutionWordListIndex
      );
    },
    getGameOverText(): string {
      if (this.enteredWords.length === 1) return "Incredible!";
      if (this.enteredWords.length === 2) return "Impressive!";
      if (this.enteredWords.length === 3) return "Great job!";
      if (this.enteredWords.length === 4) return "Well done!";
      if (this.enteredWords.length === 5) return "Nice!";
      else return "Close one!";
    },
    checkIfGameOver(): boolean {
      if (
        this.enteredWords[this.enteredWords.length - 1].toLowerCase() ===
        this.todaysWord
      ) {
        this.isGameOver = true;
        this.acceptingInputs = false;
        this.saveToLocalStorage("isGameOver", this.isGameOver);
        this.saveToLocalStorage("acceptingInputs", false);
        const gameOverText = this.getGameOverText();
        this.showPopup(gameOverText, "INFO");
        if (this.freePlayMode) {
          return true;
        }
        this.gameStats.played++;
        this.gameStats.wins++;
        this.gameStats.currentStreak++;
        this.gameStats.maxStreak =
          this.gameStats.currentStreak > this.gameStats.maxStreak
            ? this.gameStats.currentStreak
            : this.gameStats.maxStreak;
        this.gameStats.guessDistribution[this.numberOfEnteredWords]++;
        this.gameStats.mostRecentGuessAmount = this.enteredWords.length;
        this.saveToLocalStorage("gameStats", this.gameStats);
        setTimeout(() => this.activateModal("stats"), 2500);
        return true;
      }
      if (this.enteredWords.length === 6) {
        this.isGameOver = true;
        this.acceptingInputs = false;
        this.saveToLocalStorage("isGameOver", this.isGameOver);
        this.saveToLocalStorage("acceptingInputs", this.acceptingInputs);
        this.showPopup(
          "The word was: " + this.todaysWord.toUpperCase(),
          "INFO"
        );
        if (this.freePlayMode) {
          return true;
        }
        this.gameStats.played++;
        this.gameStats.currentStreak = 0;
        this.saveToLocalStorage("gameStats", this.gameStats);
        setTimeout(() => this.activateModal("stats"), 2500);
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
          this.saveToLocalStorage(
            "lettersConfirmedCorrect",
            this.lettersConfirmedCorrect
          );
        }
        if (matchColor[i] === "yellow") {
          this.lettersConfirmedIncluded.push(enteredWord[i]);
          this.saveToLocalStorage(
            "lettersConfirmedIncluded",
            this.lettersConfirmedIncluded
          );
        }
        if (matchColor[i] === "gray") {
          this.lettersConfirmedNotIncluded.push(enteredWord[i]);
          this.saveToLocalStorage(
            "lettersConfirmedNotIncluded",
            this.lettersConfirmedNotIncluded
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
        this.showPopup("Hard mode is active!", "ERROR");
        return false;
      }
      const wordMap: IWordMap = { ...this.todaysWordAsMap };
      // first look for all perfect matches
      for (let i = 0; i < 5; i++) {
        if (enteredWord[i] === this.todaysWord[i]) {
          wordMap[enteredWord[i]]--;
          this.matchColors[this.enteredWords.length][i] = "green";
          this.saveToLocalStorage("matchColors", this.matchColors);
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
          this.saveToLocalStorage("matchColors", this.matchColors);
        } else {
          // letters that exist in the word somewhere
          this.matchColors[this.enteredWords.length][i] = "yellow";
          this.saveToLocalStorage("matchColors", this.matchColors);
          wordMap[enteredWord[i]]--;
        }
      }
      this.updateLetters(
        enteredWord,
        this.matchColors[this.enteredWords.length]
      );
      this.enteredWords.push(enteredWord.join(""));
      this.saveToLocalStorage("enteredWords", this.enteredWords);
      return true;
    },
    sendKey(value: string): void {
      if (value === "ENTER") {
        if (this.currentWordAsArray.length < 5)
          this.showPopup("Not enough letters!", "ERROR");
        else {
          const currentWord = this.currentWordAsArray.join("");
          if (!this.validWordList.includes(currentWord.toLowerCase())) {
            this.showPopup("Not in word list!", "ERROR");
            return;
          }
          if (this.evaluateWord(this.currentWordAsArray)) {
            // word was successfully registered as an attempt
            this.checkIfGameOver();
            this.currentWordAsArray = [];
            this.saveToLocalStorage(
              "currentWordAsArray",
              this.currentWordAsArray
            );
          }
        }
      } else if (value === "DEL") {
        if (!!this.currentWordAsArray.length) {
          this.currentWordAsArray.pop();
          this.saveToLocalStorage(
            "currentWordAsArray",
            this.currentWordAsArray
          );
        }
      } else {
        // user typed in a valid letter
        if (this.currentWordAsArray.length === 5) return;
        this.currentWordAsArray.push(value);
        this.saveToLocalStorage("currentWordAsArray", this.currentWordAsArray);
      }
    },
  },
});
