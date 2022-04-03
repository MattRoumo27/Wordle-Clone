import React from "react";
import KeyTile from "./KeyTile";
import IKeyTile from "../../interfaces/IKeyTile";

interface Props {
  row: Array<IKeyTile>;
  keyPressEvent: (tilePressed: IKeyTile) => void;
}

const KeyRow: React.FC<Props> = ({ row, keyPressEvent }) => {
  return (
    <div className="row">
      {row.map((tile: IKeyTile, colIndex: number) => {
        return <KeyTile key={colIndex} tile={tile} keyPressEvent={keyPressEvent} />;
      })}
    </div>
  );
};

export default KeyRow;
