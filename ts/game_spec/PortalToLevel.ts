import { IRenderable } from '../collisions/IRenderable';
import { NoCollisionBox } from '../collisions/NoCollisionBox';
import State from '../general/State';
import Vector from '../general/Vector';

type PortalType = 'right' | 'left';

class PortalToLevel extends NoCollisionBox implements IRenderable {
  destLvlId: number;
  type: PortalType;
  constructor(destLvlId: number, pos: Vector, dim: Vector, type: PortalType) {
    super(pos, dim);
    this.destLvlId = destLvlId;
    this.type = type;
  }

  update() {
    if (this.isCollidingWithPlayer()) {
      this.goToDestLvl();
    }
  }

  render() {}

  goToDestLvl() {
    State.currentLevel = State.levels[this.destLvlId];
    if (this.type === 'right') State.currentLevel.setLeftSpawnPoint();
    else if (this.type === 'left') State.currentLevel.setRightSpawnPoint();
    State.currentLevel.movePlayerToSpawnPoint();
    State.scene = 'Room';
  }
}

export default PortalToLevel;
