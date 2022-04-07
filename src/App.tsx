import React, { useState, useEffect } from "react";
import _ from "lodash";
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

const MaximumGuesses: number = 6;
const wordLength: number = 5;

const initialBoard: GameBoard = new Array(MaximumGuesses)
  .fill("")
  .map((_) => new Array(wordLength).fill("").map((_) => ({ letter: "", color: Color.None })));

// Get a random word from the giant word list to use as a solution
const generateRandomWord = (): string => {
  return words[Math.floor(Math.random() * words.length)].toUpperCase();
};

interface IAppState {
  currentBoard: GameBoard;
  guessNum: number;
  currentGuess: string;
  keyboardTiles: KeyboardLayout;
  solution: string;
  hasWon: boolean | null;
}

let initialState: IAppState = {
  currentBoard: [],
  guessNum: 0,
  currentGuess: "",
  keyboardTiles: [],
  solution: generateRandomWord(),
  hasWon: null,
};

const App: React.FC = () => {
  const [{ currentBoard, guessNum, currentGuess, keyboardTiles, solution, hasWon }, setState] =
    useState<IAppState>({
      ...initialState,
      currentBoard: _.cloneDeep(initialBoard),
      keyboardTiles: _.cloneDeep(StandardKeyboardTiles),
    });

  // Monitor the game state to see if the player has lost or still has additional tries
  useEffect(() => {
    if (guessNum < MaximumGuesses) {
      setState((prevState) => ({ ...prevState, currentGuess: "" }));
    } else if (guessNum > MaximumGuesses) {
      setState((prevState) => ({ ...prevState, hasWon: false }));
    }
  }, [guessNum]);

  useEffect(() => {
    if (hasWon) {
      alert("Congrats! You have won! Close this pop-up and hit ENTER to play again!");
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
      setState((prevState) => ({ ...prevState, hasWon: true }));
    }
    let updatedKeyboardTiles = keyboardTileManager.GetKeyboard();

    setState((prevState) => ({
      ...prevState,
      currentBoard: board,
      guessNum: guessNum + 1,
      keyboardTiles: updatedKeyboardTiles,
    }));
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
      setState((prevState) => ({ ...prevState, currentGuess: guess, currentBoard: board }));
    }
  };

  const resetGame = (): void => {
    setState({
      ...initialState,
      currentBoard: _.cloneDeep(initialBoard),
      keyboardTiles: _.cloneDeep(StandardKeyboardTiles),
      solution: generateRandomWord(),
    });
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
