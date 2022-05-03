import { IRenderable } from '../../collisions/IRenderable';
import Assets from '../../general/Assets';
import State from '../../general/State';
import Vector from '../../general/Vector';
import ElevatorCorridorSprites from '../../sprites/ElevatorCorridorSprites';
import { Rectangle } from '../../collisions/Rectangle';

class MainElevator implements IRenderable {
  y: number = 0;
  floor: Rectangle = new Rectangle(480 - 48 * 1.5, 86 * 3, 48 * 3, 24);

  update() {}

  render() {
    const canvasMiddleX = State.canvas.width / 2;
    const elevatorHalfWidth =
      ElevatorCorridorSprites.SPRITES.elevator.getRealDimensions().x / 2;
    Assets.elevatorCorridorSprites.renderSprite(
      ElevatorCorridorSprites.SPRITES.elevator,
      new Vector(canvasMiddleX - elevatorHalfWidth, 0)
    );
  }
}

export default MainElevator;
