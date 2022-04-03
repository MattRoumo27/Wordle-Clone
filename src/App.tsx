import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import LetterGrid from "./components/Letters/LetterGrid";
import KeyboardGrid from "./components/Keyboard/KeyboardGrid";
import "./style/App.css";
import GameBoard from "./types/types";
import IKeyTile from "./interfaces/IKeyTile";
import Color from "./enums/Color";
import SubmissionValidator from "./classes/SubmissionValidator";
import KeyPressEventHandler from "./classes/KeyPressEventHandler";
import IKeyPressEvent from "./interfaces/IKeyPressEvent";

const App: React.FC = () => {
  const MaximumGuesses: number = 6;
  const wordLength: number = 5;
  const solution: string = "MOODY";

  const initialBoard: GameBoard = new Array(MaximumGuesses)
    .fill("")
    .map((_) => new Array(wordLength).fill("").map((_) => ({ letter: "", color: Color.None })));

  // Will use the number of guesses to determine which row to insert letters into
  const [guessNum, setGuessNum] = useState<number>(0);
  // Keep the user's current guess as a string object
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [currentBoard, setCurrentBoard] = useState<GameBoard>(initialBoard);

  // Monitor the game state to see if the player has lost or still has additional tries
  useEffect(() => {
    if (guessNum < MaximumGuesses) {
      setCurrentGuess("");
    } else {
      alert("You have lost!");
    }
  }, [guessNum]);

  const submitGuess = (): void => {
    let Validator: SubmissionValidator = new SubmissionValidator(
      currentGuess,
      solution,
      guessNum,
      wordLength
    );

    const boardState: [boolean, GameBoard] = Validator.CheckSubmission(currentBoard);
    const isValidInput: boolean = boardState[0];
    const board: GameBoard = boardState[1];

    if (!isValidInput) return;

    setCurrentBoard(board);
    setGuessNum(guessNum + 1);
  };

  const keyPressEvent = (tilePressed: IKeyTile): void => {
    const keyPressEvent: IKeyPressEvent = {
      currentGuess: currentGuess,
      modifiedGuess: currentGuess,
      board: currentBoard,
      keyPressed: tilePressed,
      submitGuess: () => submitGuess(),
      wordLength: wordLength,
      maxGuesses: MaximumGuesses,
      guessNum: guessNum,
    };

    let keyPressEventHandler = new KeyPressEventHandler(keyPressEvent);
    let keyPressState: [boolean, string, GameBoard] = keyPressEventHandler.ProcessKeyEvent();
    const isValid: boolean = keyPressState[0];
    const guess: string = keyPressState[1];
    const board: GameBoard = keyPressState[2];

    if (isValid) {
      setCurrentGuess(guess);
      setCurrentBoard(board);
    }
  };

  return (
    <div className="App">
      <Header />
      <LetterGrid board={currentBoard} />
      <KeyboardGrid keyPressEvent={keyPressEvent} />
    </div>
  );
};

export default App;
