import Color from "../enums/Color";
import Key from "../enums/Key";

interface IKeyTile {
  letter: Key;
  color: Color;
  isDisabled: boolean;
}

export default IKeyTile;
