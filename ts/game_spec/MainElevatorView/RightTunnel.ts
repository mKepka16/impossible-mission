import { IRenderableOnCamera } from '../../collisions/IRenderableOnCamera';
import Assets from '../../general/Assets';
import State from '../../general/State';
import Vector from '../../general/Vector';
import ElevatorCorridorSprites from '../../sprites/ElevatorCorridorSprites';
import Tunnel from './Tunnel';

class RightTunnel extends Tunnel implements IRenderableOnCamera {
  update() {}

  render(dt: number, cameraY: number) {
    const x = 480 + 72;
    // ceiling
    Assets.elevatorCorridorSprites.renderSprite(
      ElevatorCorridorSprites.SPRITES.rightCeiling,
      new Vector(x, this.y - cameraY)
    );

    // walls
    this.renderWall(x - 6, this.y + 24, cameraY, 54);
    this.renderWall(x + 48, this.y + 24, cameraY);
    this.renderWall(x + 144, this.y + 24, cameraY);
    this.renderWall(x + 240, this.y + 24, cameraY);
    this.renderWall(x + 336, this.y + 24, cameraY);

    //white floor
    Assets.elevatorCorridorSprites.renderSprite(
      ElevatorCorridorSprites.SPRITES.whiteFloorRight,
      new Vector(x, this.y + 144 - cameraY)
    );

    //floor
    Assets.elevatorCorridorSprites.renderSprite(
      ElevatorCorridorSprites.SPRITES.rightFloor,
      new Vector(x, this.y + 168 - cameraY)
    );
  }

  renderWall(x: number, y: number, cameraY: number, width = 96) {
    const ctx = State.canvas.ctx;
    const borderColor = '#70746F';
    const wallColor = this.color;

    ctx.fillStyle = borderColor;
    ctx.fillRect(x, y - cameraY, 6, 120);

    ctx.fillStyle = wallColor;
    ctx.fillRect(x + 6, y - cameraY, width - 6, 120);
  }
}

export default RightTunnel;
