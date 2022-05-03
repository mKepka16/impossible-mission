import { IRenderable } from '../../collisions/IRenderable';
import { Rectangle } from '../../collisions/Rectangle';
import Assets from '../../general/Assets';
import State from '../../general/State';
import Vector from '../../general/Vector';
import ElevatorCorridorSprites from '../../sprites/ElevatorCorridorSprites';
import Level from '../Level';
import Player from '../Player';
import Camera from './Camera';
import CorridorBackground from './CorridorBackground';
import CorridorWall from './CorridorWall';
import LeftTunnel from './LeftTunnel';
import MainElevator from './MainElevator';
import PocketComputer from './PocketComputer';
import RightTunnel from './RightTunnel';

class ElevatorCorridor implements IRenderable {
  mainElevator: MainElevator = new MainElevator();
  camera: Camera = new Camera();
  corridorWallModulesNum: number = 92;
  leftCorridorBackground: CorridorBackground = new CorridorBackground(
    0,
    Math.ceil(
      this.getRealHeight() /
        ElevatorCorridorSprites.SPRITES.background.getRealDimensions().y
    )
  );
  rightCorridorBackground: CorridorBackground = new CorridorBackground(
    960 - ElevatorCorridorSprites.SPRITES.background.getRealDimensions().x,
    Math.ceil(
      this.getRealHeight() /
        ElevatorCorridorSprites.SPRITES.background.getRealDimensions().y
    )
  );
  leftWall: CorridorWall = new CorridorWall(384, this.corridorWallModulesNum);
  rightWall: CorridorWall = new CorridorWall(552, this.corridorWallModulesNum);
  leftTunnel: LeftTunnel = new LeftTunnel(96, '#DFF60A');
  rightTunnel: RightTunnel = new RightTunnel(96, '#1DD21F');

  objects: Rectangle[] = [];

  constructor() {
    // super();
    // this.playerStartingPosition = new Vector(470, 0);
    // Player.setLeft(this.playerStartingPosition.x);
    // Player.setTop(this.playerStartingPosition.y);
    this.objects.push(this.mainElevator.floor);
  }

  render() {
    const dt = State.canvas.deltaTime;
    this.renderCorridorBackground();
    this.leftCorridorBackground.render(dt, this.camera.y);
    this.rightCorridorBackground.render(dt, this.camera.y);
    this.leftWall.render(dt, this.camera.y);
    this.rightWall.render(dt, this.camera.y);
    this.mainElevator.render();
    this.renderElevatorTopAndBottom();

    this.leftTunnel.render(dt, this.camera.y);
    this.rightTunnel.render(dt, this.camera.y);
    Player.render(dt);

    // Assets.elevatorCorridorSprites.renderSprite(
    //   ElevatorCorridorSprites.SPRITES.wall,
    //   new Vector(0, 0)
    // );
    PocketComputer.render();
  }

  update() {
    const dt = State.canvas.deltaTime;
    Player.update(dt, Level.DEFAULT_GRAVITY, 0.6);

    let playerFallingDown = true;
    this.objects.forEach((object) => {
      const collided = Player.collideRectangle(object);
      if (collided) playerFallingDown = false;
    });
    Player.fallingDown = playerFallingDown;
    // setTimeout(() => {
    //   this.camera.y += dt * 500;
    // }, 2000);
  }

  getRealHeight() {
    return 24 + 24 * 3 * this.corridorWallModulesNum + 48;
  }

  renderCorridorBackground() {
    const ctx = State.canvas.ctx;
    ctx.fillStyle = 'black';
    const canvasMiddleX = State.canvas.width / 2;
    const elevatorHalfWidth =
      ElevatorCorridorSprites.SPRITES.elevator.getRealDimensions().x / 2;
    ctx.fillRect(
      canvasMiddleX - elevatorHalfWidth,
      0,
      elevatorHalfWidth * 2,
      360
    );
  }

  renderElevatorTopAndBottom() {
    Assets.elevatorCorridorSprites.renderSprite(
      ElevatorCorridorSprites.SPRITES.elevatorTop,
      new Vector(384, -this.camera.y)
    );

    const bottomY = this.getRealHeight() - 48;

    Assets.elevatorCorridorSprites.renderSprite(
      ElevatorCorridorSprites.SPRITES.elevatorBottom,
      new Vector(408, bottomY - this.camera.y)
    );
    Assets.elevatorCorridorSprites.renderSprite(
      ElevatorCorridorSprites.SPRITES.elevatorBottomWall,
      new Vector(384, bottomY - this.camera.y - 24)
    );
    Assets.elevatorCorridorSprites.renderSprite(
      ElevatorCorridorSprites.SPRITES.elevatorBottomWall,
      new Vector(552, bottomY - this.camera.y - 24)
    );
  }
}

export default ElevatorCorridor;
