import { IRenderable } from '../../collisions/IRenderable';
import Assets from '../../general/Assets';
import State from '../../general/State';
import Vector from '../../general/Vector';
import ElevatorCorridorSprites from '../../sprites/ElevatorCorridorSprites';
import MiniMap from './MiniMap';

class PocketComputer implements IRenderable {
  update(dt: number) {
    MiniMap.update(dt);
  }

  render(dt: number) {
    Assets.elevatorCorridorSprites.renderSprite(
      ElevatorCorridorSprites.SPRITES.pocketComputer,
      new Vector(
        0,
        State.canvas.height -
          ElevatorCorridorSprites.SPRITES.pocketComputer.getRealDimensions().y
      )
    );
    this.renderMiniMap(dt);
  }

  renderMiniMap(dt: number) {
    Assets.elevatorCorridorSprites.renderSprite(
      ElevatorCorridorSprites.SPRITES.minimapBorder,
      new Vector(175, 480 - 88.5)
    );
    MiniMap.render(dt);
  }
}

export default new PocketComputer();
