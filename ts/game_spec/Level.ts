import Elevator from './Elevator';
import { IRenderable } from '../collisions/IRenderable';
import Player from './Player';
import { Rectangle } from '../collisions/Rectangle';
import State from '../general/State';
import View from './View';
import { levelsEntries } from '../presets/levels_presets';
import Vector from '../general/Vector';
import Rooms from './Rooms';
import ElevatorCorridor from './MainElevatorView/ElevatorCorridor';
import Controls from './Controls';
import Terminal from './Terminal';
import { Robot } from './Robot';
import Theme from '../sprites/Theme';
import Ball from './Ball';

const SPAWN_POSITIONS = {
  leftTop: new Vector(54, 50),
  leftBottom: new Vector(54, 470),
  rightTop: new Vector(882, 50),
  rightBottom: new Vector(882, 470),
};

class Level extends View implements IRenderable {
  id: number;
  objects: IRenderable[];
  static DEFAULT_GRAVITY = 2.5;
  robotsSnooze: boolean = false;
  theme: Theme;

  constructor(id: number, objects: IRenderable[], theme: Theme = Theme.THEME0) {
    super();
    this.id = id;
    this.objects = objects;
    this.theme = theme;
    Elevator.assignGroups(this.objects);
  }

  leaveRoomToThe(dir: 'left' | 'right') {
    const column = Rooms.findRoomColumn(this.id);
    const place = Rooms.roomsPositions[this.id];
    let elevator: ElevatorCorridor;
    let stop: number = (place - 1) * 2;
    Player.resetPlayer();

    if (dir === 'left') {
      elevator = State.elevators[column - 1];
      levelsEntries[this.id].left === 'bottom' && stop++;
      Controls.action = 'standLeft';
    } else {
      elevator = State.elevators[column];
      levelsEntries[this.id].right === 'bottom' && stop++;
      Controls.action = 'standRight';
    }

    State.currentElevator = elevator;
    State.currentElevator.mainElevator.moveToStop(stop);
    State.currentElevator.movePlayerTo(dir === 'left' ? 'right' : 'left');
    // To do:
    //  Move player to the right position on the new elevator view
    State.scene = 'Elevator';
  }

  movePlayerToSpawnPoint() {
    console.log('move player to spawnpoint');
    Player.setTop(this.playerStartingPosition.y);
    Player.setLeft(this.playerStartingPosition.x);
  }

  setLeftSpawnPoint() {
    if (levelsEntries[this.id].left === 'top') {
      console.log('left top');
      this.playerStartingPosition = SPAWN_POSITIONS.leftTop;
    } else {
      console.log('left bottom');
      this.playerStartingPosition = SPAWN_POSITIONS.leftBottom;
    }
  }

  setRightSpawnPoint() {
    if (levelsEntries[this.id].right === 'top') {
      console.log('right top');
      this.playerStartingPosition = SPAWN_POSITIONS.rightTop;
    } else {
      console.log('right bottom');
      this.playerStartingPosition = SPAWN_POSITIONS.rightBottom;
    }
  }

  public update() {
    if (Player.r < 0) this.leaveRoomToThe('left');
    else if (Player.l > 960) this.leaveRoomToThe('right');
    if (Player.t > 960) Player.kill();

    const dt = State.canvas.deltaTime;
    Player.update(dt, State.gravity, State.friction);

    let playerFallingDown = true;
    for (let index = this.objects.length - 1; index > -1; --index) {
      let object = this.objects[index];
      if (object.update) {
        if (!(this.robotsSnooze && object instanceof Robot))
          object?.update(dt, State.gravity, State.friction);
      }
      if (
        object instanceof Rectangle &&
        object instanceof Robot === false &&
        object instanceof Ball === false &&
        Player.collideRectangle(object)
      ) {
        playerFallingDown = false;
      }
    }
    Player.fallingDown = playerFallingDown;
  }

  public render() {
    const dt = State.canvas.deltaTime;
    this.renderBackground();
    this.objects.forEach((p) => {
      p.render(dt);
    });
    Player.render(dt);
    this.objects
      .filter((o) => o instanceof Terminal)
      .forEach((terminal) => (terminal as Terminal).renderTerminalView());
  }

  renderBackground() {
    State.canvas.ctx.beginPath();
    State.canvas.ctx.fillStyle = levelsEntries[this.id].color;
    State.canvas.ctx.fillRect(0, 0, State.canvas.width, State.canvas.height);
  }

  resetLifts() {
    this.objects
      .filter((o) => o instanceof Elevator)
      .forEach((elevator) => (elevator as Elevator).resetLift());
  }

  startRobotSnooze() {
    this.robotsSnooze = true;
    this.objects
      .filter((o) => o instanceof Robot)
      .forEach((robot) => ((robot as Robot).laser.currentSprite = null));
    setTimeout(() => (this.robotsSnooze = false), 20000);
  }
}

export default Level;

// declare global {
//   interface Array<T> {
//     random <T>(): T
//   }
// }

// Array.prototype.random = function () {
//   return this[Math.floor(Math.random()*this.length)]
// }

// let arr1 = [1, 2, 3]
// let arr2 = ["a", "b"]

// let randArr1 = arr1.random()
// let randArr2 = arr2.random()
