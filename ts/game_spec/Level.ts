import Elevator from './Elevator';
import { ElevatorSpot } from './ElevatorSpot';
import { IRenderable } from '../collisions/IRenderable';
import Platform from './Platform';
import Player from './Player';
import { Rectangle } from '../collisions/Rectangle';
import State from '../general/State';
import Vector from '../general/Vector';
import Wall from './Wall';
import { Robot } from './Robot';
import RobotSprites from '../sprites/RobotSprites';
import Searchable from './Searchable';

class Level implements IRenderable {
  objects: IRenderable[];
  static DEFAULT_GRAVITY = 2;
  playerStartingPosition: Vector = new Vector(10, 0);

  constructor() {
    this.objects = [
      new Wall(0, 0, 1, 'right'),
      new Wall(0, 7, 18, 'right'),
      new Wall(39, 0, 19, 'left'),
      // Floor
      new Platform(1, 24, 1.5),
      new Elevator(4, 24, 1),
      new Platform(7, 24, 1.5),
      new ElevatorSpot(10, 24, 2),
      new Platform(13, 24, 1.5),
      new Elevator(16, 24, 3),
      new Platform(19, 24, 1.5),
      new Elevator(22, 24, 4),
      new Platform(25, 24, 2),
      new Elevator(29, 24, 5),
      new Platform(32, 24, 4.5),

      // 1
      new Platform(1, 18, 1.5),
      new Elevator(4, 18, 1),
      new Platform(7, 18, 1.5),
      new Elevator(10, 18, 2),
      new Platform(13, 18, 1.5),
      new Elevator(16, 18, 3),
      new Platform(19, 18, 1.5),
      new Elevator(22, 18, 4),
      new Platform(25, 18, 2),
      new Elevator(29, 18, 5),
      new Platform(32, 18, 3.5),

      // 2
      new Platform(1, 12, 1.5),
      new ElevatorSpot(4, 12, 1),
      new Platform(7, 12, 1.5),
      new Elevator(10, 12, 2),
      new Platform(13, 12, 1.5),
      new ElevatorSpot(16, 12, 3),
      new Platform(19, 12, 1.5),
      new ElevatorSpot(22, 12, 4),
      new Platform(25, 12, 2),
      new ElevatorSpot(29, 12, 5),
      new Platform(32, 12, 3.5),

      //3
      new Platform(0, 6, 2),
      new ElevatorSpot(4, 6, 1),
      new Platform(7, 6, 1.5),
      new ElevatorSpot(10, 6, 2),
      new Platform(13, 6, 1.5),
      new ElevatorSpot(16, 6, 3),
      new Platform(19, 6, 1.5),
      new ElevatorSpot(22, 6, 4),
      new Platform(25, 6, 2),
      new ElevatorSpot(29, 6, 5),
      new Platform(32, 6, 3.5),

      // robots
      new Robot({
        y: 438 - RobotSprites.SPRITES.left[0].getRealDimensions().y,
        fromX: 24 * 13,
        toX: 24 * 16,
      }),
      new Robot({
        y: 150 + 24 * 6 - RobotSprites.SPRITES.left[0].getRealDimensions().y,
        fromX: 24 * 19,
        toX: 24 * 22,
      }),

      new Searchable('controlPanel', 13.5, 6),
      new Searchable('bath', 33, 6),
    ];
    Elevator.assignGroups(this.objects);
  }

  public update() {
    const dt = State.canvas.deltaTime;
    Player.update(dt, State.gravity, State.friction);

    let playerFallingDown = true;
    for (let index = this.objects.length - 1; index > -1; --index) {
      let object = this.objects[index];
      if (object.update) object?.update(dt, State.gravity, State.friction);
      if (object instanceof Rectangle && Player.collideRectangle(object)) {
        playerFallingDown = false;
      }
    }
    Player.fallingDown = playerFallingDown;
  }

  public render() {
    const dt = State.canvas.deltaTime;
    this.objects.forEach((p) => {
      p.render(dt);
    });
    Player.render(dt);
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
