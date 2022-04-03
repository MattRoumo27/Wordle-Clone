import React, { useState } from "react";
import KeyRow from "./KeyRow";
import IKeyTile from "../../interfaces/IKeyTile";
import StandardKeyboardTiles from "./StandardKeyboardTiles";

interface Props {
  keyPressEvent: (tilePressed: IKeyTile) => void;
}

const KeyboardGrid: React.FC<Props> = ({ keyPressEvent }) => {
  const [tiles] = useState<IKeyTile[][]>(StandardKeyboardTiles);

  return (
    <div className="keyboardGrid">
      {tiles.map((row: Array<IKeyTile>, rowIndex: number) => {
        return <KeyRow key={rowIndex} row={row} keyPressEvent={keyPressEvent} />;
      })}
    </div>
  );
};

export default KeyboardGrid;
