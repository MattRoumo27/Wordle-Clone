import React from "react";
import KeyRow from "./KeyRow";
import IKeyTile from "../../interfaces/IKeyTile";
import { KeyboardLayout } from "../../types/types";

interface Props {
  keyboardTiles: KeyboardLayout;
  keyPressEvent: (tilePressed: IKeyTile) => void;
}

const KeyboardGrid: React.FC<Props> = ({ keyboardTiles, keyPressEvent }) => {
  return (
    <div className="keyboardGrid">
      {keyboardTiles.map((row: Array<IKeyTile>, rowIndex: number) => {
        return <KeyRow key={rowIndex} row={row} keyPressEvent={keyPressEvent} />;
      })}
    </div>
  );
};

export default KeyboardGrid;
