import { IRenderableOnCamera } from '../../collisions/IRenderableOnCamera';
import Assets from '../../general/Assets';
import Vector from '../../general/Vector';
import ElevatorCorridorSprites from '../../sprites/ElevatorCorridorSprites';

class CorridorBackground implements IRenderableOnCamera {
  numOfSegments: number;
  x: number;
  constructor(x: number, numOfSegments: number) {
    this.numOfSegments = numOfSegments;
    this.x = x;
  }

  update() {}

  render(dt: number, cameraY: number) {
    const bgHeight =
      ElevatorCorridorSprites.SPRITES.background.getRealDimensions().y;
    for (let i = 0; i < this.numOfSegments; i++) {
      Assets.elevatorCorridorSprites.renderSprite(
        ElevatorCorridorSprites.SPRITES.background,
        new Vector(this.x, bgHeight * i - cameraY)
      );
    }
  }
}

export default CorridorBackground;
