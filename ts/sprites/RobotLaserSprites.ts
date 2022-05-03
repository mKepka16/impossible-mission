import ThemedSprites, { PixelChange } from './ThemedSprites';

import Sprite from './Sprite';
import State from '../general/State';
import Vector from '../general/Vector';

class RobotLaserSprites extends ThemedSprites {
  static SPRITES = {
    laser: [
      new Sprite(new Vector(220, 586), new Vector(48, 10)),
      new Sprite(new Vector(220 + 48 * 4, 586), new Vector(48, 10)),

      new Sprite(new Vector(220 + 48, 586), new Vector(48, 10)),
      new Sprite(new Vector(220 + 48 * 5, 586), new Vector(48, 10)),

      new Sprite(new Vector(220 + 48 * 2, 586), new Vector(48, 10)),
      new Sprite(new Vector(220 + 48 * 6, 586), new Vector(48, 10)),

      new Sprite(new Vector(220 + 48 * 3, 586), new Vector(48, 10)),
      new Sprite(new Vector(220 + 48 * 7, 586), new Vector(48, 10)),
    ],
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

export default RobotLaserSprites;
