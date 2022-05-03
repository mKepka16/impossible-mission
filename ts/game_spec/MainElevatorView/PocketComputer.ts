import { IRenderable } from '../../collisions/IRenderable';
import Assets from '../../general/Assets';
import State from '../../general/State';
import Vector from '../../general/Vector';
import ElevatorCorridorSprites from '../../sprites/ElevatorCorridorSprites';

class PocketComputer implements IRenderable {
  update() {}

  render() {
    Assets.elevatorCorridorSprites.renderSprite(
      ElevatorCorridorSprites.SPRITES.pocketComputer,
      new Vector(
        0,
        State.canvas.height -
          ElevatorCorridorSprites.SPRITES.pocketComputer.getRealDimensions().y
      )
    );
  }
}

export default new PocketComputer();
