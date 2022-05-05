import { IRenderable } from '../../collisions/IRenderable';
import Assets from '../../general/Assets';
import State from '../../general/State';
import Vector from '../../general/Vector';
import ElevatorCorridorSprites from '../../sprites/ElevatorCorridorSprites';
import { Rectangle } from '../../collisions/Rectangle';
import { NoCollisionBox } from '../../collisions/NoCollisionBox';
import Controls from '../Controls';

class MainElevator implements IRenderable {
  y: number = 0;
  floor: Rectangle = new Rectangle(0, 86 * 3, 960, 24);
  targetStop: number = 0;
  detectionBox: NoCollisionBox = new NoCollisionBox(
    new Vector(466, 200),
    new Vector(28, 50)
  );
  currentStop: number = 0;
  leftWallBlock: Rectangle = new Rectangle(408, 100, 18, 200);
  rightWallBlock: Rectangle = new Rectangle(534, 100, 18, 200);

  update(dt: number) {
    const targetY = this.getStopY(this.targetStop);
    const yDiff = targetY - this.y;
    const dir = Math.sign(yDiff);
    if (dir === 0) {
      this.currentStop = this.targetStop;
    }
    Controls.elevatorBlock = dir !== 0;

    const speed = 1200;
    let vy = dt * dir * speed;
    if (Math.abs(vy) > Math.abs(yDiff)) {
      vy = yDiff;
    }
    this.y += vy;
  }

  getMoveDir() {
    return Math.sign(this.getStopY(this.targetStop) - this.y);
  }

  // There are 12 stops
  getStopY(stop: number) {
    const wallHeight =
      ElevatorCorridorSprites.SPRITES.wall.getRealDimensions().y;
    return wallHeight * stop * 8;
  }

  setDestStop(stop: number) {
    this.targetStop = stop;
  }

  moveToStop(stop: number) {
    const stopY = this.getStopY(stop);
    this.y = stopY;
    this.targetStop = stop;
  }

  render() {
    const canvasMiddleX = State.canvas.width / 2;
    const elevatorHalfWidth =
      ElevatorCorridorSprites.SPRITES.elevator.getRealDimensions().x / 2;
    Assets.elevatorCorridorSprites.renderSprite(
      ElevatorCorridorSprites.SPRITES.elevator,
      new Vector(canvasMiddleX - elevatorHalfWidth, 0)
    );
  }

  renderWalls() {
    const canvasMiddleX = State.canvas.width / 2;
    const elevatorHalfWidth =
      ElevatorCorridorSprites.SPRITES.elevator.getRealDimensions().x / 2;
    Assets.elevatorCorridorSprites.renderSprite(
      ElevatorCorridorSprites.SPRITES.elevatorLeftWall,
      new Vector(canvasMiddleX - elevatorHalfWidth, 0)
    );
    Assets.elevatorCorridorSprites.renderSprite(
      ElevatorCorridorSprites.SPRITES.elevatorRightWall,
      new Vector(canvasMiddleX + elevatorHalfWidth - 18, 0)
    );
  }
}

export default MainElevator;
