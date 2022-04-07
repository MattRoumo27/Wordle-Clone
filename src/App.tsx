import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import LetterGrid from "./components/Letters/LetterGrid";
import KeyboardGrid from "./components/Keyboard/KeyboardGrid";
import "./style/App.css";
import { GameBoard, KeyboardLayout } from "./types/types";
import IKeyTile from "./interfaces/IKeyTile";
import Color from "./enums/Color";
import IKeyPressEvent from "./interfaces/IKeyPressEvent";
import StandardKeyboardTiles from "./components/Keyboard/StandardKeyboardTiles";
import SubmissionValidator from "./classes/SubmissionValidator";
import KeyPressEventHandler from "./classes/KeyPressEventHandler";
import KeyboardTileManager from "./classes/KeyboardTileManager";
import words from "./words";
import Key from "./enums/Key";

interface AppState {
  board: GameBoard;
  guessNumber: number;
  guess: string;
  keyboardTiles: KeyboardLayout;
  solution: string;
  hasWon: boolean | null;
}

const MaximumGuesses: number = 6;
const wordLength: number = 5;

const initialBoard: GameBoard = new Array(MaximumGuesses)
  .fill("")
  .map((_) => new Array(wordLength).fill("").map((_) => ({ letter: "", color: Color.None })));

const generateRandomWord = (): string => {
  return words[Math.floor(Math.random() * words.length)].toUpperCase();
};

const initialState: AppState = {
  board: initialBoard,
  guessNumber: 0,
  guess: "",
  keyboardTiles: StandardKeyboardTiles,
  solution: generateRandomWord(),
  hasWon: null,
};

const App: React.FC = () => {
  const [currentBoard, setCurrentBoard] = useState<GameBoard>(initialBoard);
  // Will use the number of guesses to determine which row to insert letters into
  const [guessNum, setGuessNum] = useState<number>(0);
  // Keep the user's current guess as a string object
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [keyboardTiles, setKeyboardTiles] = useState<KeyboardLayout>(StandardKeyboardTiles);
  const [solution, setSolution] = useState<string>(generateRandomWord());
  const [hasWon, setHasWon] = useState<boolean | null>(null);

  // Monitor the game state to see if the player has lost or still has additional tries
  useEffect(() => {
    if (guessNum < MaximumGuesses) {
      setCurrentGuess("");
    } else if (guessNum > MaximumGuesses) {
      setHasWon(false);
    }
  }, [guessNum]);

  useEffect(() => {
    if (hasWon) {
      alert("Congrats! You have won!");
    } else if (hasWon === false) {
      alert("You have lost the game! Refresh to try again!");
    }
  }, [hasWon]);

  const submitGuess = (): void => {
    let Validator: SubmissionValidator = new SubmissionValidator(
      currentGuess,
      solution,
      guessNum,
      wordLength
    );

    const [isValidInput, board, errorMessage]: [boolean, GameBoard, string] =
      Validator.CheckSubmission(currentBoard);

    if (!isValidInput) {
      alert(errorMessage);
      return;
    }

    let keyboardTileManager = new KeyboardTileManager(keyboardTiles, board[guessNum]);
    keyboardTileManager.UpdateKeyTiles();
    if (currentGuess === solution) {
      keyboardTileManager.DisableAllKeysExceptEnter();
      setHasWon(true);
    }
    let updatedKeyboardTiles = keyboardTileManager.GetKeyboard();

    setCurrentBoard(board);
    setGuessNum(guessNum + 1);
    setKeyboardTiles(updatedKeyboardTiles);
  };

  const keyPressEvent = (tilePressed: IKeyTile): void => {
    if (hasWon && tilePressed.letter === Key.ENTER) {
      resetGame();
      return;
    }

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
    const [isValid, guess, board]: [boolean, string, GameBoard] =
      keyPressEventHandler.ProcessKeyEvent();

    if (isValid) {
      setCurrentGuess(guess);
      setCurrentBoard(board);
    }
  };

  const resetGame = (): void => {
    setCurrentBoard(initialBoard);
    setGuessNum(0);
    setCurrentGuess("");
    setKeyboardTiles(StandardKeyboardTiles);
    setSolution(generateRandomWord());
    setHasWon(null);
  };

  return (
    <div className="App">
      <Header />
      <LetterGrid board={currentBoard} />
      <KeyboardGrid keyboardTiles={keyboardTiles} keyPressEvent={keyPressEvent} />
    </div>
  );
};

export default App;
