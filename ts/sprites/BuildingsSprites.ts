import ThemedSprites, { PixelChange } from './ThemedSprites';
import { Side } from '../game_spec/Wall';
import Sprite from './Sprite';
import State from '../general/State';
import Vector from '../general/Vector';
import Theme from './Theme';

class BuildingsSprites extends ThemedSprites {
  static SPRITES = {
    all: new Sprite(new Vector(0, 0), new Vector(800, 600)),
    platform: {
      left: new Sprite(
        new Vector(352, 208),
        new Vector(8, 8),
        0,
        new Vector(8, 6),
        new Vector(0, -2)
      ),
      right: new Sprite(
        new Vector(344, 208),
        new Vector(8, 8),
        0,
        new Vector(8, 6),
        new Vector(0, -2)
      ),
    },
    walls: {
      right: new Sprite(new Vector(344, 200), new Vector(8, 8)),
      left: new Sprite(new Vector(352, 200), new Vector(8, 8)),
    },
    elevator: new Sprite(
      new Vector(344, 216),
      new Vector(24, 8),
      0,
      new Vector(24, 6),
      new Vector(0, -2)
    ),
  };

  constructor(plainSpritesSheet: HTMLImageElement) {
    // const theme: PixelChange[] = Array(16)
    //   .fill(null)
    //   .map((_, i) => ({
    //     old: [i, 0, 0],
    //     new: [
    //       Utils.getRandomByte(),
    //       Utils.getRandomByte(),
    //       Utils.getRandomByte(),
    //     ],
    //   }));
    const theme: PixelChange[] = [
      {
        old: [10, 0, 0],
        new: State.theme.primary,
      },
      {
        old: [2, 0, 0],
        new: State.theme.secondary,
      },
      {
        old: [12, 0, 0],
        new: State.theme.accent,
      },
      {
        old: [1, 0, 0],
        new: State.theme.special,
      },
    ];
    super(theme, plainSpritesSheet);
  }

  setNewTheme(theme: Theme) {
    this.theme[0].new = theme.primary;
    this.theme[1].new = theme.secondary;
    this.theme[2].new = theme.accent;
    this.theme[3].new = theme.special;
    this.reloadTheme();
  }

  renderPlatforms(position: Vector, platformsNumber: number) {
    const realDimensions =
      BuildingsSprites.SPRITES.platform.right.getRealDimensions();

    platformsNumber *= 2;
    let startingX = position.x;

    if (platformsNumber % 2 === 1) {
      this.renderSprite(BuildingsSprites.SPRITES.platform.right, position);
      startingX += realDimensions.x;
    }

    for (
      let x = startingX;
      x < position.x + realDimensions.x * platformsNumber;
      x += 2 * realDimensions.x
    ) {
      this.renderSprite(
        BuildingsSprites.SPRITES.platform.left,
        new Vector(x, position.y)
      );
      this.renderSprite(
        BuildingsSprites.SPRITES.platform.right,
        new Vector(x + realDimensions.x, position.y)
      );
    }
  }

  renderWalls(position: Vector, wallsNumber: number, side: Side) {
    const realDimensions =
      BuildingsSprites.SPRITES.walls.right.getRealDimensions();

    for (let i = 0; i < wallsNumber; i++) {
      this.renderSprite(
        BuildingsSprites.SPRITES.walls[side],
        new Vector(position.x, position.y + i * realDimensions.y)
      );
    }
  }
}

export default BuildingsSprites;
