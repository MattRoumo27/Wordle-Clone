import React from "react";
import LetterRow from "./LetterRow";
import GameBoard from "../../types/types";
import IGuessTile from "../../interfaces/IGuessTile";

interface Props {
  board: GameBoard;
}

const LetterGrid: React.FC<Props> = ({ board }) => {
  return (
    <div className="letterGrid">
      {board.map((row: Array<IGuessTile>, rowIndex: number) => {
        return <LetterRow key={rowIndex} row={row} />;
      })}
    </div>
  );
};

export default LetterGrid;
