import GameBoard from "../types/types";
import Color from "../enums/Color";
import IGuessTile from "../interfaces/IGuessTile";

interface SolutionModel {
  letter: string;
  hasBeenUsed: boolean;
}

class SubmissionValidator {
  solution: string;
  guess: string;
  guessNum: number;
  wordLength: number;

  constructor(guess: string, solution: string, guessNum: number, wordLength: number) {
    this.guess = guess;
    this.solution = solution;
    this.guessNum = guessNum;
    this.wordLength = wordLength;
  }

  CheckSubmission(gameBoard: GameBoard): [boolean, GameBoard] {
    let newGameBoard = gameBoard;
    let isValid = true;

    const isGuessAValidLength: boolean = this.CompareLengths();
    if (!isGuessAValidLength) {
      isValid = false;
      return [isValid, gameBoard];
    }

    newGameBoard = this.MarkGreenTiles(newGameBoard);
    newGameBoard = this.MarkYellowTiles(newGameBoard);
    newGameBoard = this.MarkDarkGrayTiles(newGameBoard);

    return [isValid, newGameBoard];
  }

  CompareLengths(): boolean {
    if (this.guess.length !== this.wordLength) {
      alert(`You must enter a ${this.wordLength} letter word`);
      return false;
    } else {
      return true;
    }
  }

  // Mark the tiles that are in the correct spot as Green to give a visual indication to the user
  MarkGreenTiles(gameBoard: GameBoard): GameBoard {
    const solutionAsArray: Array<string> = this.solution.split("");
    const guessAsArray: Array<string> = this.guess.split("");

    for (let i = 0; i < guessAsArray.length; i++) {
      if (guessAsArray[i] === solutionAsArray[i]) {
        gameBoard[this.guessNum][i].color = Color.Green;
      }
    }

    return gameBoard;
  }

  // Mark the tiles yellow if the letter is contained in the solution but not in the correct position
  MarkYellowTiles(gameBoard: GameBoard): GameBoard {
    const solutionList: Array<string> = this.solution.split("");
    const guessList: Array<string> = this.guess.split("");
    let solutionModelList: Array<SolutionModel> = new Array(5);

    // Create an array that will keep track of which letters have already been marked as green or yellow
    for (let i = 0; i < solutionList.length; i++) {
      solutionModelList[i] = { letter: solutionList[i], hasBeenUsed: false };
    }

    // Mark all the green tiles as already being used
    for (let i = 0; i < solutionModelList.length; i++) {
      if (gameBoard[this.guessNum][i].color === Color.Green) {
        solutionModelList[i].hasBeenUsed = true;
      }
    }

    // Mark all the tiles that are contained in the solution but have not been used yet as yellow
    for (let i = 0; i < guessList.length; i++) {
      for (let j = 0; j < solutionModelList.length; j++) {
        const solutionModel: SolutionModel = solutionModelList[j];
        let gameTile: IGuessTile = gameBoard[this.guessNum][i];
        const isTileEligibleForYellowColor: boolean =
          guessList[i] === solutionModel.letter &&
          !solutionModel.hasBeenUsed &&
          gameTile.color === Color.None;

        if (isTileEligibleForYellowColor) {
          gameTile.color = Color.Yellow;
          solutionModel.hasBeenUsed = true;
        }
      }
    }

    return gameBoard;
  }

  // Mark the tiles that are neither yellow or green to indicate they are not a part of the solution
  MarkDarkGrayTiles(gameBoard: GameBoard): GameBoard {
    for (let i = 0; i < gameBoard[this.guessNum].length; i++) {
      if (gameBoard[this.guessNum][i].color === Color.None)
        gameBoard[this.guessNum][i].color = Color.DarkGray;
    }

    return gameBoard;
  }
}

export default SubmissionValidator;
