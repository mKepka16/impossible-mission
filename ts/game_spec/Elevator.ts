import Assets from '../general/Assets';
import BuildingsSprites from '../sprites/BuildingsSprites';
import Controls from './Controls';
import { ElevatorSpot } from './ElevatorSpot';
import { IGroupMember } from './IGroupMember';
import { IRenderable } from '../collisions/IRenderable';
import { NoCollisionBox } from '../collisions/NoCollisionBox';
import Player from '../game_spec/Player';
import { Rectangle } from '../collisions/Rectangle';
import Vector from '../general/Vector';
import State from '../general/State';

class Elevator extends Rectangle implements IRenderable, IGroupMember {
  interactionBox: NoCollisionBox;
  playerOnElevator: boolean;
  group: number;
  objectsInGroup: (Elevator | ElevatorSpot)[];
  targetY: number;
  groupYCords: number[];
  sl: number; //starting l
  st: number; // starting t

  constructor(l: number, t: number, group: number) {
    const dimensions = BuildingsSprites.SPRITES.elevator.getRealDimensions();
    super(
      l * 24,
      t * 24 - BuildingsSprites.SPRITES.elevator.getRealOffset().y,
      dimensions.x,
      dimensions.y
    );
    this.sl = this.l;
    this.st = this.t;

    this.targetY = this.t;
    this.group = group;
    this.playerOnElevator = false;
    this.interactionBox = new NoCollisionBox(
      new Vector(this.l + Player.w - 1, this.t - 20),
      new Vector(72 - Player.w * 2 + 2, 20)
    );
  }

  resetLift() {
    this.targetY = this.st;
    this.setTop(this.st);
  }

  static assignGroups(objects: IRenderable[]) {
    const elevators: Elevator[] = objects.filter(
      (o) => o instanceof Elevator
    ) as Elevator[];
    const elevatorSpots: ElevatorSpot[] = objects.filter(
      (o) => o instanceof ElevatorSpot
    ) as ElevatorSpot[];

    for (const elevator of elevators) {
      elevator.objectsInGroup = [
        ...elevators.filter(
          (e) => e !== elevator && e.group === elevator.group
        ),
        ...elevatorSpots.filter((es) => es.group === elevator.group),
      ];
      elevator.groupYCords = [elevator, ...elevator.objectsInGroup].map((o) => {
        if (o instanceof Elevator) return o.t;
        else if (o instanceof ElevatorSpot) return o.pos.y;
      });
      elevator.groupYCords.sort((a, b) => a - b);
    }
  }

  getMoveOptions() {
    const smallestY = this.groupYCords[0];
    const biggestY = this.groupYCords[this.groupYCords.length - 1];

    const elevators = this.objectsInGroup.filter(
      (o) => o instanceof Elevator
    ) as Elevator[];

    const canMoveUp = [...elevators, this].every((e) => e.t !== smallestY);
    const canMoveDown = [...elevators, this].every((e) => e.t !== biggestY);
    return { canMoveUp, canMoveDown };
  }

  static moveGroup(
    groupMembers: (Elevator | ElevatorSpot)[],
    dir: 'up' | 'down'
  ) {
    const elevators = groupMembers.filter(
      (o) => o instanceof Elevator
    ) as Elevator[];

    for (const elevator of elevators) {
      const currentYIndex = elevator.groupYCords.indexOf(elevator.t);
      const indexDir = dir === 'up' ? -1 : 1;
      elevator.targetY = elevator.groupYCords[currentYIndex + indexDir];
    }
  }

  setBottom(b: number) {
    this.b = b;
    this.t = b - this.h;
    this.interactionBox.pos.y = this.t - this.interactionBox.dim.y;
  }
  setTop(t: number) {
    this.t = t;
    this.b = t + this.h;
    this.interactionBox.pos.y = this.t - this.interactionBox.dim.y;
  }

  areInGroupElevatorsNotMoving() {
    const elevators = this.objectsInGroup.filter(
      (o) => o instanceof Elevator
    ) as Elevator[];
    return elevators.every((e) => e.t === e.targetY);
  }

  update(dt: number) {
    this.playerOnElevator = this.interactionBox.isCollidingWithPlayer();

    if (
      this.playerOnElevator &&
      Controls.up &&
      this.areInGroupElevatorsNotMoving()
    ) {
      Controls.up = false;
      Controls.actionBlock = true;

      const { canMoveUp } = this.getMoveOptions();
      if (canMoveUp) Elevator.moveGroup([this, ...this.objectsInGroup], 'up');

      Player.isElevating = true;
    } else if (
      this.playerOnElevator &&
      Controls.down &&
      this.areInGroupElevatorsNotMoving()
    ) {
      Controls.down = false;
      Controls.actionBlock = true;

      const { canMoveDown } = this.getMoveOptions();
      if (canMoveDown)
        Elevator.moveGroup([this, ...this.objectsInGroup], 'down');

      Player.isElevating = true;
    }

    const SPEED = 350 * State.canvas.deltaTime;
    let yVelocity = SPEED;
    let yDiff = this.targetY - this.t;
    if (Math.abs(yDiff) < yVelocity) {
      yVelocity = Math.abs(yDiff);
    }
    const dir = Math.sign(yDiff);
    this.vy = dir * yVelocity;

    if (yDiff === 0 && Player.isElevating && this.playerOnElevator) {
      Player.isElevating = false;
      Controls.actionBlock = false;
    }

    this.ob = this.b; // update the old positions to the current positions
    this.ol = this.l;
    this.or = this.r;
    this.ot = this.t;

    this.l += this.vx; // update the current positions to the new positions
    this.t += this.vy;
    this.r = this.l + this.w;
    this.b = this.t + this.h;
    this.interactionBox.pos.y = this.t - this.interactionBox.dim.y;
  }

  render() {
    Assets.buildingsSprites.renderSprite(
      BuildingsSprites.SPRITES.elevator,
      new Vector(this.l, this.t)
    );
    // this.interactionBox.drawBorders();
    // this.drawColliders('#0022ee');
  }
}

export default Elevator;
