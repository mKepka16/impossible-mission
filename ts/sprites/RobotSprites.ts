import ThemedSprites, { PixelChange } from './ThemedSprites';

import Sprite from './Sprite';
import State from '../general/State';
import Vector from '../general/Vector';

class RobotSprites extends ThemedSprites {
  static SPRITES = {
    left: [
      new Sprite(new Vector(24, 579), new Vector(14, 21)),
      new Sprite(new Vector(24 + 98, 579), new Vector(14, 21)),
    ],
    right: [
      new Sprite(new Vector(38, 579), new Vector(14, 21)),
      new Sprite(new Vector(38 + 98, 579), new Vector(14, 21)),
    ],
    leftToRight: [
      new Sprite(new Vector(24, 579), new Vector(14, 21)),
      new Sprite(new Vector(24 + 98, 579), new Vector(14, 21)),

      new Sprite(new Vector(80, 579), new Vector(14, 21)),
      new Sprite(new Vector(80 + 98, 579), new Vector(14, 21)),
      new Sprite(new Vector(108, 579), new Vector(14, 21)),
      new Sprite(new Vector(108 + 98, 579), new Vector(14, 21)),
      new Sprite(new Vector(94, 579), new Vector(14, 21)),
      new Sprite(new Vector(94 + 98, 579), new Vector(14, 21)),

      new Sprite(new Vector(38, 579), new Vector(14, 21)),
      new Sprite(new Vector(38 + 98, 579), new Vector(14, 21)),
    ],
    rightToLeft: [
      new Sprite(new Vector(38, 579), new Vector(14, 21)),
      new Sprite(new Vector(38 + 98, 579), new Vector(14, 21)),

      new Sprite(new Vector(94, 579), new Vector(14, 21)),
      new Sprite(new Vector(94 + 98, 579), new Vector(14, 21)),
      new Sprite(new Vector(108, 579), new Vector(14, 21)),
      new Sprite(new Vector(108 + 98, 579), new Vector(14, 21)),
      new Sprite(new Vector(80, 579), new Vector(14, 21)),
      new Sprite(new Vector(80 + 98, 579), new Vector(14, 21)),

      new Sprite(new Vector(24, 579), new Vector(14, 21)),
      new Sprite(new Vector(24 + 98, 579), new Vector(14, 21)),
    ],
    lookLeft: new Sprite(new Vector(52, 579), new Vector(14, 21)),
    lookRight: new Sprite(new Vector(66, 579), new Vector(14, 21)),
  };

  constructor(plainSpritesSheet: HTMLImageElement) {
    const theme: PixelChange[] = [
      {
        old: [3, 0, 0],
        new: State.theme.robot.ledOff,
      },
      {
        old: [5, 0, 0],
        new: State.theme.robot.ledOn,
      },
      {
        old: [6, 0, 0],
        new: State.theme.robot.secondary,
      },
      {
        old: [14, 0, 0],
        new: State.theme.robot.primary,
      },
    ];
    super(theme, plainSpritesSheet);
  }
}

export default RobotSprites;
