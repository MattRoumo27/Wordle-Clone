import React from "react";
import IGuessTile from "../../interfaces/IGuessTile";

interface Props {
  tile: IGuessTile;
}

const LetterTile: React.FC<Props> = ({ tile }) => {
  return (
    <div className="letterTile" style={{ backgroundColor: tile.color }}>
      {tile.letter}
    </div>
  );
};

export default LetterTile;
