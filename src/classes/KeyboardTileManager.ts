import { KeyboardLayout } from "../types/types";
import IGuessTile from "../interfaces/IGuessTile";
import IKeyTile from "../interfaces/IKeyTile";
import Color from "../enums/Color";

class KeyboardTileManager {
  keyboard: KeyboardLayout;
  guessRow: IGuessTile[];

  constructor(keyboard: KeyboardLayout, guessRow: IGuessTile[]) {
    this.keyboard = keyboard;
    this.guessRow = guessRow;
  }

  UpdateKeyTiles(): void {
    for (let i = 0; i < this.guessRow.length; i++) {
      for (let row = 0; row < this.keyboard.length; row++) {
        for (let column = 0; column < this.keyboard[row].length; column++) {
          if (this.keyboard[row][column].letter === this.guessRow[i].letter) {
            this.UpdateKeyColor(row, column, this.guessRow[i]);
          }
        }
      }
    }
  }

  UpdateKeyColor(row: number, column: number, guessTile: IGuessTile): void {
    let key: IKeyTile = this.keyboard[row][column];
    let colors = Object.values(Color);

    if (colors.indexOf(key.color) < colors.indexOf(guessTile.color)) {
      key.color = guessTile.color;
    }
  }

  DisableAllKeys(): void {
    for (let row = 0; row < this.keyboard.length; row++) {
      for (let column = 0; column < this.keyboard[row].length; column++) {
        this.keyboard[row][column].isDisabled = true;
      }
    }
  }

  GetKeyboard(): KeyboardLayout {
    return this.keyboard;
  }
}

export default KeyboardTileManager;
