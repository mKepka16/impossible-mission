import Vector from '../general/Vector';
import Sprite from './Sprite';
import ThemedSprites, { PixelChange } from './ThemedSprites';

class PocketComputerSprites extends ThemedSprites {
  static SPRITES = {
    cursor: new Sprite(new Vector(300, 280), new Vector(24, 19)),
    leftTube: new Sprite(new Vector(320, 200), new Vector(5, 45)),
    rightTube: new Sprite(new Vector(325, 200), new Vector(5, 45)),
  };

  constructor(plainSpritesSheet: HTMLImageElement) {
    const theme: PixelChange[] = [
      {
        old: [1, 0, 0],
        new: [255, 255, 255],
      },
      {
        old: [7, 0, 0],
        new: [223, 246, 12],
      },
    ];
    super(theme, plainSpritesSheet);
  }
}

export default PocketComputerSprites;
