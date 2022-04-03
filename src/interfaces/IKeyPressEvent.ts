import GameBoard from "../types/types";
import IKeyTile from "../interfaces/IKeyTile";

interface IKeyPressEvent {
  currentGuess: string;
  modifiedGuess: string;
  board: GameBoard;
  keyPressed: IKeyTile;
  submitGuess: () => void;
  wordLength: number;
  maxGuesses: number;
  guessNum: number;
}

export default IKeyPressEvent;
