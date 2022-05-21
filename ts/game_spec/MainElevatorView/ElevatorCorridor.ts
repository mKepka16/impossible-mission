import { IRenderable } from '../../collisions/IRenderable';
import { IRenderableOnCamera } from '../../collisions/IRenderableOnCamera';
import { Rectangle } from '../../collisions/Rectangle';
import Assets from '../../general/Assets';
import Debugger from '../../general/Debugger';
import State from '../../general/State';
import Vector from '../../general/Vector';
import { levelsEntries } from '../../presets/levels_presets';
import ElevatorCorridorSprites from '../../sprites/ElevatorCorridorSprites';
import Controls from '../Controls';
import Player from '../Player';
import PortalToLevel from '../PortalToLevel';
import Rooms from '../Rooms';
import View from '../View';
import Camera from './Camera';
import CorridorBackground from './CorridorBackground';
import CorridorWall from './CorridorWall';
import ElevatorTheme from './ElevatorTheme';
import LeftTunnel from './LeftTunnel';
import MainElevator from './MainElevator';
import PocketComputer from './PocketComputer';
import RightTunnel from './RightTunnel';

interface TunnelInfo {
  color: string;
  roomId: number;
}

interface Stop {
  height: number;
  left: TunnelInfo | null;
  right: TunnelInfo | null;
}

class ElevatorCorridor extends View implements IRenderable {
  mainElevator: MainElevator = new MainElevator();
  theme: ElevatorTheme;
  id: number;
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
  tunnels: IRenderableOnCamera[] = [];

  objects: Rectangle[] = [];
  stopsInfo: Stop[];
  leftPortal: PortalToLevel = new PortalToLevel(
    0,
    new Vector(-30, 0),
    new Vector(30, 300),
    'left'
  );
  rightPortal: PortalToLevel = new PortalToLevel(
    0,
    new Vector(960, 0),
    new Vector(30, 300),
    'right'
  );

  getAvailableStops() {
    const stops = this.stopsInfo
      .filter((stopInfo) => stopInfo.left || stopInfo.right)
      .map((stopInfo) => stopInfo.height);
    stops.sort((a, b) => a - b);
    if (stops[stops.length - 1] !== 11) stops.push(11);
    if (stops[0] !== 0) stops.unshift(0);
    return stops;
  }

  getCurrentStopInfo() {
    return this.stopsInfo.find(
      (stopInfo) => stopInfo.height === this.mainElevator.currentStop
    );
  }

  getNextStop() {
    if (this.mainElevator.currentStop === 11)
      return this.mainElevator.currentStop;
    const stops = this.getAvailableStops();
    const currentStopIndex = stops.indexOf(this.mainElevator.currentStop);
    return stops[currentStopIndex + 1];
  }

  getPreviousStop() {
    if (this.mainElevator.currentStop === 0)
      return this.mainElevator.currentStop;
    const stops = this.getAvailableStops();
    const currentStopIndex = stops.indexOf(this.mainElevator.currentStop);
    return stops[currentStopIndex - 1];
  }

  constructor(id: number, theme: ElevatorTheme) {
    super();
    this.id = id;
    this.theme = theme;
    this.objects.push(this.mainElevator.floor);
    this.stopsInfo = this.getStopsInfo();
    this.stopsInfo.forEach((stopInfo) => {
      if (stopInfo.left)
        this.tunnels.push(
          new LeftTunnel(
            stopInfo.left.roomId,
            stopInfo.height,
            stopInfo.left.color
          )
        );
      if (stopInfo.right)
        this.tunnels.push(
          new RightTunnel(
            stopInfo.right.roomId,
            stopInfo.height,
            stopInfo.right.color
          )
        );
    });
    this.movePlayerTo('center');
  }

  movePlayerTo(place: 'left' | 'center' | 'right') {
    let newPos = new Vector(470, 155);
    if (place === 'left') newPos = new Vector(50, 155);
    if (place === 'right') newPos = new Vector(900, 155);
    Player.setLeft(newPos.x);
    Player.setTop(newPos.y);
  }

  render() {
    const dt = State.canvas.deltaTime;
    this.renderCorridorBackground();
    this.leftCorridorBackground.render(dt, this.camera.y);
    this.rightCorridorBackground.render(dt, this.camera.y);
    this.leftWall.render(dt, this.camera.y);
    this.rightWall.render(dt, this.camera.y);
    this.mainElevator.render();

    this.tunnels.forEach((tunnel) => {
      tunnel.render(dt, this.camera.y);
    });
    Player.render(dt);
    this.mainElevator.renderWalls();
    this.renderElevatorTopAndBottom();

    PocketComputer.render(dt);

    if (Debugger.showWallsAndPlatformsHitboxes) {
      this.mainElevator.floor.drawColliders('#ff5500');
      this.mainElevator.leftWallBlock.drawColliders('#ff5500');
      this.mainElevator.rightWallBlock.drawColliders('#ff5500');
    }
  }

  update() {
    this.camera.y = this.mainElevator.y;
    const dt = State.canvas.deltaTime;
    PocketComputer.update(dt);

    this.tunnels.forEach((tunnel) => {
      tunnel.update(dt, 0, 0, this.camera.y);
    });

    this.mainElevator.update(dt);
    Player.update(dt, State.gravity, 0.6);

    let playerFallingDown = true;
    this.objects.forEach((object) => {
      const collided = Player.collideRectangle(object);
      if (collided) playerFallingDown = false;
    });
    Player.fallingDown = playerFallingDown;

    const currentStopInfo = this.getCurrentStopInfo();
    if (currentStopInfo.left)
      this.leftPortal.destLvlId = currentStopInfo.left.roomId;
    if (currentStopInfo.right)
      this.rightPortal.destLvlId = currentStopInfo.right.roomId;

    this.leftPortal.update();
    this.rightPortal.update();

    if (!currentStopInfo.left)
      Player.collideRectangle(this.mainElevator.leftWallBlock);
    if (!currentStopInfo.right)
      Player.collideRectangle(this.mainElevator.rightWallBlock);

    // Moving the elevator
    if (this.mainElevator.detectionBox.isCollidingWithPlayer()) {
      const dir = this.mainElevator.getMoveDir();
      if (dir === 0) {
        if (Controls.down) this.mainElevator.setDestStop(this.getNextStop());
        if (Controls.up) this.mainElevator.setDestStop(this.getPreviousStop());
      } else if (dir === 1 && Controls.up)
        this.mainElevator.setDestStop(this.mainElevator.currentStop);
      else if (dir === -1 && Controls.down)
        this.mainElevator.setDestStop(this.mainElevator.currentStop);
    }
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

    const bottomY = this.getRealHeight() - 24;

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

  getStopsInfo(): Stop[] {
    const roomsOnTheLeft = Rooms.roomsColumns[this.id];
    const roomsOnTheRight = Rooms.roomsColumns[this.id + 1];
    return Array(12)
      .fill(null)
      .map((_, i) => {
        let left: TunnelInfo = null;
        let right: TunnelInfo = null;
        const place = Math.floor((i + 2) / 2);
        const toUpperPartOfRoom = i % 2 === 0;
        const roomOnTheLeft = roomsOnTheLeft.find((room) => {
          if (Rooms.roomsPositions[room] !== place) return false;
          if (levelsEntries[room].right === 'top' && toUpperPartOfRoom)
            return true;
          if (levelsEntries[room].right === 'bottom' && !toUpperPartOfRoom)
            return true;
          return false;
        });
        if (roomOnTheLeft !== undefined) {
          left = {
            color: levelsEntries[roomOnTheLeft].color,
            roomId: roomOnTheLeft,
          };
        }
        const roomOnTheRight = roomsOnTheRight.find((room) => {
          if (Rooms.roomsPositions[room] !== place) return false;
          if (levelsEntries[room].left === 'top' && toUpperPartOfRoom)
            return true;
          if (levelsEntries[room].left === 'bottom' && !toUpperPartOfRoom)
            return true;
          return false;
        });
        if (roomOnTheRight !== undefined) {
          right = {
            color: levelsEntries[roomOnTheRight].color,
            roomId: roomOnTheRight,
          };
        }

        return {
          height: i,
          left: left,
          right: right,
        };
      });
  }
}

export default ElevatorCorridor;
