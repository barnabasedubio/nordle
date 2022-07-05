import { defineStore } from "pinia";
import validWordList from "../data/validWordList.json";
import solutionWordList from "../data/solutionWordList.json";

//TODO: export interfaces to new file

interface IWordMap {
  [letter: string]: number;
}

interface IGuessDistribution {
  [num: string]: number;
}

interface IGameStats {
  played: number;
  wins: number;
  losses: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: IGuessDistribution;
  mostRecentGuessAmount: number; // needed to highlight correct bar in the guess distribution bar chart
}

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
  darkTheme: boolean;
  highContrast: boolean;
  freePlayMode: boolean;
  gameStats: IGameStats;
}

export const useStore = defineStore("main", {
  state: (): IState => {
    return {
      validWordList,
      solutionWordList,
      todaysWord: solutionWordList[385],
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
            currentStreak: 0, //TODO: currentStreak should also reset when user leaves out a day
            maxStreak: 0,
            guessDistribution: {
              one: 0,
              two: 1,
              three: 2,
              four: 3,
              five: 8,
              six: 6,
            } as IGuessDistribution,
            mostRecentGuessAmount: 5,
          } as IGameStats),
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
    numberOfEnteredWords(state): string {
      if (state.enteredWords.length === 1) return "one";
      if (state.enteredWords.length === 2) return "two";
      if (state.enteredWords.length === 3) return "three";
      if (state.enteredWords.length === 4) return "four";
      if (state.enteredWords.length === 5) return "five";
      if (state.enteredWords.length === 6) return "six";
      return "";
    },
    winPercentage: (state): number =>
      state.gameStats.played
        ? (state.gameStats.wins / state.gameStats.played) * 100
        : 0,
  },
  actions: {
    checkIfGameOver(): boolean {
      if (
        this.currentWordAsArray.join("").toLowerCase() ===
        this.todaysWordAsArray.join("")
      ) {
        this.acceptingInputs = false;
        localStorage.setItem("acceptingInputs", "false");
        alert("Nice");
        this.gameStats.played++;
        this.gameStats.wins++;
        this.gameStats.currentStreak++;
        this.gameStats.maxStreak =
          this.gameStats.currentStreak > this.gameStats.maxStreak
            ? this.gameStats.currentStreak
            : this.gameStats.maxStreak;
        this.gameStats.guessDistribution[this.numberOfEnteredWords]++;
        localStorage.setItem("gameStats", JSON.stringify(this.gameStats));
        return true;
      }
      if (this.enteredWords.length === 6) {
        this.acceptingInputs = false;
        localStorage.setItem("acceptingInputs", "false");
        alert("Game Over!");
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
