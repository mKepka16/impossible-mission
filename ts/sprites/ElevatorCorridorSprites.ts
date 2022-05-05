import ThemedSprites, { PixelChange } from './ThemedSprites';
import Sprite from './Sprite';
import Vector from '../general/Vector';
import ElevatorTheme from '../game_spec/MainElevatorView/ElevatorTheme';
class ElevatorCorridorSprites extends ThemedSprites {
  static SPRITES = {
    pocketComputer: new Sprite(new Vector(0, 200), new Vector(320, 80)),
    leftCeiling: new Sprite(new Vector(164, 280), new Vector(136, 8)),
    rightCeiling: new Sprite(new Vector(164, 296), new Vector(136, 8)),
    leftFloor: new Sprite(new Vector(164, 288), new Vector(136, 8)),
    rightFloor: new Sprite(new Vector(164, 304), new Vector(136, 8)),
    whiteFloorLeft: new Sprite(new Vector(164, 312), new Vector(136, 8)),
    whiteFloorRight: new Sprite(new Vector(164, 320), new Vector(136, 8)),
    elevator: new Sprite(new Vector(708, 16), new Vector(48, 96)),
    elevatorLeftWall: new Sprite(new Vector(708, 16), new Vector(6, 96)),
    elevatorRightWall: new Sprite(new Vector(750, 16), new Vector(6, 96)),
    wall: new Sprite(new Vector(756, 16), new Vector(8, 24)),
    background: new Sprite(new Vector(320, 0), new Vector(128, 200)),
    elevatorTop: new Sprite(new Vector(708, 0), new Vector(64, 8)),
    elevatorBottom: new Sprite(new Vector(716, 8), new Vector(48, 8)),
    elevatorBottomWall: new Sprite(new Vector(708, 0), new Vector(8, 16)),
  };

  constructor(plainSpritesSheet: HTMLImageElement) {
    const theme: PixelChange[] = [
      {
        old: [0, 0, 0],
        new: [0, 0, 0],
      },
      {
        old: [1, 0, 0],
        new: [255, 255, 255],
      },
      {
        old: [2, 0, 0],
        new: [190, 26, 36],
      },
      {
        old: [3, 0, 0],
        new: [48, 230, 198],
      },
      {
        old: [12, 0, 0],
        new: [112, 116, 111],
      },
      {
        old: [5, 0, 0],
        new: [31, 210, 30],
      },
      {
        old: [6, 0, 0],
        new: [33, 31, 174],
      },
      {
        old: [7, 0, 0],
        new: [223, 246, 10],
      },
      {
        old: [10, 0, 0],
        new: [254, 74, 87],
      },
      {
        old: [14, 0, 0],
        new: [95, 83, 254],
      },
    ];
    super(theme, plainSpritesSheet);
  }

  setNewTheme(theme: ElevatorTheme) {
    this.theme[2].new = theme.border;
    this.theme[8].new = theme.fill;
    this.reloadTheme();
  }
}

export default ElevatorCorridorSprites;
