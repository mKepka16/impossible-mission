import { IRenderableOnCamera } from '../../collisions/IRenderableOnCamera';
import Assets from '../../general/Assets';
import State from '../../general/State';
import Vector from '../../general/Vector';
import ElevatorCorridorSprites from '../../sprites/ElevatorCorridorSprites';

class LeftTunnel implements IRenderableOnCamera {
  y: number;
  color: string;

  constructor(y: number, color: string) {
    this.y = y;
    this.color = color;
  }

  update() {}

  render(dt: number, cameraY: number) {
    // ceiling
    Assets.elevatorCorridorSprites.renderSprite(
      ElevatorCorridorSprites.SPRITES.leftCeiling,
      new Vector(0, this.y - cameraY)
    );

    // walls
    this.renderWall(-30, this.y + 24, cameraY);
    this.renderWall(66, this.y + 24, cameraY);
    this.renderWall(162, this.y + 24, cameraY);
    this.renderWall(258, this.y + 24, cameraY);
    this.renderWall(354, this.y + 24, cameraY, 54);

    //white floor
    Assets.elevatorCorridorSprites.renderSprite(
      ElevatorCorridorSprites.SPRITES.whiteFloorLeft,
      new Vector(0, this.y + 144 - cameraY)
    );

    //floor
    Assets.elevatorCorridorSprites.renderSprite(
      ElevatorCorridorSprites.SPRITES.leftFloor,
      new Vector(0, this.y + 168 - cameraY)
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

export default LeftTunnel;
