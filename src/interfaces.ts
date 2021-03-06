export interface IWordMap {
  [letter: string]: number;
}

export interface IGuessDistribution {
  [num: string]: number;
}

export interface IGameStats {
  played: number;
  wins: number;
  losses: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: IGuessDistribution;
  mostRecentGuessAmount: number;
}

export interface IState {
  currentDateId: string;
  validWordList: string[];
  solutionWordList: string[];
  solutionWordListIndex: number;
  currentWordAsArray: string[];
  enteredWords: string[];
  matchColors: string[][];
  acceptingInputs: boolean;
  lettersConfirmedCorrect: string[];
  lettersConfirmedIncluded: string[];
  lettersConfirmedNotIncluded: string[];
  hardMode: boolean;
  darkTheme: boolean;
  freePlayMode: boolean;
  gameStats: IGameStats;
  isGameOver: boolean;
  timeUntilReset: number;
  popupActive: boolean;
  popupText: string;
  popupType: "ERROR" | "INFO";
  showModal: boolean;
  modalType: string;
}
