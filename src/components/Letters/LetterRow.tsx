import React from "react";
import IGuessTile from "../../interfaces/IGuessTile";
import LetterTile from "./LetterTile";

interface Props {
  row: Array<IGuessTile>;
}

const LetterRow: React.FC<Props> = ({ row }) => {
  return (
    <div className="row">
      {row.map((tile: IGuessTile, colIndex: number) => {
        return <LetterTile key={colIndex} tile={tile} />;
      })}
    </div>
  );
};

export default LetterRow;
