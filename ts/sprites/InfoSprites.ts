import ThemedSprites, { PixelChange } from './ThemedSprites';

import Sprite from './Sprite';
import State from '../general/State';
import Vector from '../general/Vector';
import { getRGB, levelsEntries } from '../presets/levels_presets';
class InfoSprites extends ThemedSprites {
  static SPRITES = {
    platformsReset: new Sprite(new Vector(254, 521), new Vector(28, 23)),
    sleepRobot: new Sprite(new Vector(110, 522), new Vector(48, 22)),
  };

  constructor(plainSpritesSheet: HTMLImageElement) {
    const theme: PixelChange[] = [
      {
        old: [5, 0, 0],
        new: getRGB(levelsEntries[State.currentLevel?.id]?.color),
      },
      {
        old: [1, 0, 0],
        new: [255, 255, 255],
      },
    ];
    super(theme, plainSpritesSheet);
  }
}

export default InfoSprites;
