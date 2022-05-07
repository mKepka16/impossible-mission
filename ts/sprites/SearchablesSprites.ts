import ThemedSprites, { PixelChange } from './ThemedSprites';

import Sprite from './Sprite';
import State from '../general/State';
import Vector from '../general/Vector';
class SearchablesSprites extends ThemedSprites {
  static SPRITES = {
    vendingMachine: new Sprite(new Vector(0, 544), new Vector(22, 28)),
    deskWithLamp: new Sprite(new Vector(22, 544), new Vector(56, 24)),
    deskWithComputer: new Sprite(new Vector(78, 544), new Vector(16, 22)),
    scanner: new Sprite(new Vector(94, 544), new Vector(24, 20)),
    kitchen: new Sprite(new Vector(118, 544), new Vector(46, 24)),
    fridge: new Sprite(new Vector(164, 544), new Vector(24, 32)),
    candyMachine: new Sprite(new Vector(188, 544), new Vector(32, 31)),
    commode: new Sprite(new Vector(220, 544), new Vector(20, 21)),
    bookshelf: new Sprite(new Vector(428, 544), new Vector(24, 37)),
    fireplace: new Sprite(new Vector(496, 544), new Vector(70, 28)),
    bed: new Sprite(new Vector(116, 568), new Vector(48, 11)),
    sofa: new Sprite(new Vector(332, 565), new Vector(42, 16)),
    couchWithLamp: new Sprite(new Vector(566, 544), new Vector(22, 32)),
    controlPanel: new Sprite(new Vector(357, 544), new Vector(16, 21)),
    bath: new Sprite(new Vector(270, 544), new Vector(48, 32)), // bathroom
    toilet: new Sprite(new Vector(318, 544), new Vector(24, 16)), // bathroom
    bin: new Sprite(new Vector(94, 564), new Vector(6, 7)), // bathroom
    sinkWithMirror: new Sprite(new Vector(240, 544), new Vector(30, 32)), // bathroom
    terminal: new Sprite(new Vector(589, 544), new Vector(24, 22)),
  };

  constructor(plainSpritesSheet: HTMLImageElement) {
    const theme: PixelChange[] = [
      {
        old: [9, 0, 0],
        new: State.theme.furniture.color1,
      },
      {
        old: [1, 0, 0],
        new: State.theme.furniture.color3,
      },
      {
        old: [10, 0, 0],
        new: State.theme.furniture.color1,
      },
    ];
    super(theme, plainSpritesSheet);
  }
}

export default SearchablesSprites;
