import { IRenderableOnCamera } from '../../collisions/IRenderableOnCamera';
import Assets from '../../general/Assets';
import Vector from '../../general/Vector';
import ElevatorCorridorSprites from '../../sprites/ElevatorCorridorSprites';

class CorridorWall implements IRenderableOnCamera {
  x: number;
  bigSegmentsNumber: number;

  constructor(x: number, bigSegmentsNumber: number) {
    this.x = x;
    this.bigSegmentsNumber = bigSegmentsNumber;
  }

  update() {}

  render(dt: number, cameraY: number) {
    const offsetTop = 24;
    const wallHeight =
      ElevatorCorridorSprites.SPRITES.wall.getRealDimensions().y;
    for (let i = 0; i < this.bigSegmentsNumber; i++) {
      Assets.elevatorCorridorSprites.renderSprite(
        ElevatorCorridorSprites.SPRITES.wall,
        new Vector(this.x, offsetTop + i * wallHeight - cameraY)
      );
    }
  }
}

export default CorridorWall;
