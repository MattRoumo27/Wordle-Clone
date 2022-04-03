import React from "react";
import IKeyTile from "../../interfaces/IKeyTile";

interface Props {
  tile: IKeyTile;
  keyPressEvent: (tilePressed: IKeyTile) => void;
}

const KeyTile: React.FC<Props> = ({ tile, keyPressEvent }) => {
  return (
    <div className="keyboardTile">
      <button
        style={{ backgroundColor: tile.color }}
        disabled={tile.isDisabled}
        onClick={() => keyPressEvent(tile)}
      >
        {tile.letter}
      </button>
    </div>
  );
};

export default KeyTile;
