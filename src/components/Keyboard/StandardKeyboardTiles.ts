import Key from "../../enums/Key";
import Color from "../../enums/Color";
import IKeyTile from "../../interfaces/IKeyTile";

const firstRowOfKeys: IKeyTile[] = [
  { letter: Key.Q, color: Color.Gray, isDisabled: false },
  { letter: Key.W, color: Color.Gray, isDisabled: false },
  { letter: Key.E, color: Color.Gray, isDisabled: false },
  { letter: Key.R, color: Color.Gray, isDisabled: false },
  { letter: Key.T, color: Color.Gray, isDisabled: false },
  { letter: Key.Y, color: Color.Gray, isDisabled: false },
  { letter: Key.U, color: Color.Gray, isDisabled: false },
  { letter: Key.I, color: Color.Gray, isDisabled: false },
  { letter: Key.O, color: Color.Gray, isDisabled: false },
  { letter: Key.P, color: Color.Gray, isDisabled: false },
];

const secondRowOfKeys: IKeyTile[] = [
  { letter: Key.A, color: Color.Gray, isDisabled: false },
  { letter: Key.S, color: Color.Gray, isDisabled: false },
  { letter: Key.D, color: Color.Gray, isDisabled: false },
  { letter: Key.F, color: Color.Gray, isDisabled: false },
  { letter: Key.G, color: Color.Gray, isDisabled: false },
  { letter: Key.H, color: Color.Gray, isDisabled: false },
  { letter: Key.J, color: Color.Gray, isDisabled: false },
  { letter: Key.K, color: Color.Gray, isDisabled: false },
  { letter: Key.L, color: Color.Gray, isDisabled: false },
];

const thirdRowOfKeys: IKeyTile[] = [
  { letter: Key.ENTER, color: Color.Gray, isDisabled: false },
  { letter: Key.Z, color: Color.Gray, isDisabled: false },
  { letter: Key.X, color: Color.Gray, isDisabled: false },
  { letter: Key.C, color: Color.Gray, isDisabled: false },
  { letter: Key.V, color: Color.Gray, isDisabled: false },
  { letter: Key.B, color: Color.Gray, isDisabled: false },
  { letter: Key.N, color: Color.Gray, isDisabled: false },
  { letter: Key.M, color: Color.Gray, isDisabled: false },
  { letter: Key.DEL, color: Color.Gray, isDisabled: false },
];

const StandardKeyboardTiles: IKeyTile[][] = [firstRowOfKeys, secondRowOfKeys, thirdRowOfKeys];

export default StandardKeyboardTiles;
