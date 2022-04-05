import Key from "../enums/Key";
import IKeyTile from "../interfaces/IKeyTile";
import { GameBoard } from "../types/types";
import IKeyPressEvent from "../interfaces/IKeyPressEvent";

class KeyPressEventHandler {
  currentGuess: string;
  modifiedGuess: string;
  board: GameBoard;
  keyPressed: IKeyTile;
  submitGuess: () => void;
  wordLength: number;
  maxGuesses: number;
  guessNum: number;

  constructor(keyPressEvent: IKeyPressEvent) {
    this.currentGuess = keyPressEvent.currentGuess;
    this.modifiedGuess = keyPressEvent.modifiedGuess;
    this.board = keyPressEvent.board;
    this.keyPressed = keyPressEvent.keyPressed;
    this.submitGuess = keyPressEvent.submitGuess;
    this.wordLength = keyPressEvent.wordLength;
    this.maxGuesses = keyPressEvent.maxGuesses;
    this.guessNum = keyPressEvent.guessNum;
  }

  ProcessKeyEvent(): [boolean, string, GameBoard] {
    this.HandleKey();

    const canEditBoard: boolean =
      this.modifiedGuess !== this.currentGuess &&
      this.modifiedGuess.length <= this.wordLength &&
      this.guessNum < this.maxGuesses;

    let isValid = true;
    if (canEditBoard) {
      this.EditBoard();
    } else {
      isValid = false;
    }

    return [isValid, this.modifiedGuess, this.board];
  }

  HandleKey(): void {
    switch (this.keyPressed.letter) {
      case Key.DEL:
        if (this.currentGuess.length > 0) {
          this.modifiedGuess = this.modifiedGuess.slice(0, -1);
        }
        break;
      case Key.ENTER:
        this.submitGuess();
        break;
      default:
        this.modifiedGuess += this.keyPressed.letter;
        break;
    }
  }

  EditBoard(): void {
    const whitespaceNeeded: number = this.wordLength - this.modifiedGuess.length;
    let guessWithWhitespace: string =
      this.modifiedGuess + new Array(whitespaceNeeded + 1).join(" ");
    let guessList: Array<string> = guessWithWhitespace.split("");

    for (let i = 0; i < this.board[this.guessNum].length; i++) {
      this.board[this.guessNum][i].letter = guessList[i];
    }
  }
}

export default KeyPressEventHandler;
