import { IRenderable } from '../collisions/IRenderable';
import { Rectangle } from '../collisions/Rectangle';
import Assets from '../general/Assets';
import SoundController from '../general/SoundController';
import State from '../general/State';
import Utils from '../general/Utils';
import Vector from '../general/Vector';
import { RobotActionTypes } from '../presets/robotPresets';
import RobotSprites from '../sprites/RobotSprites';
import Sprite from '../sprites/Sprite';
import { IAnimated } from './IAnimated';
import Player from './Player';
import { RobotLaser } from './RobotLaser';
import {
  RobotAttackWhenSeePlayerProperties,
  RobotFollowPlayerProperties,
  RobotProperties,
  RobotPropertiesPreparer,
  RobotSpecialBehaviour,
} from './RobotPropertiesPreparer';

export enum RobotAnimAction {
  STAND_RIGHT,
  STAND_LEFT,
  ROTATE_LEFT_RIGHT,
  ROTATE_RIGHT_LEFT,
}

export interface MovementData {
  y: number;
  fromX: number;
  toX: number;
}

type XDirection = 'left' | 'right';

export interface RobotActionBase {
  type: RobotActionTypes;
}

export interface RobotMoveAction extends RobotActionBase {
  type: RobotActionTypes.MOVE;
  xVelocity: number;
  destinationXPercentage: number;
}

export interface RobotAttackAction extends RobotActionBase {
  type: RobotActionTypes.ATTACK;
  attackDuration: number; //ms
  attackDirection?: XDirection;
}

export type RobotAction = RobotMoveAction | RobotAttackAction;

export type ActionsQueue = RobotAction[];

export const robotHitboxYOffset = 25;

export class Robot
  extends Rectangle
  implements IRenderable, RobotProperties, IAnimated
{
  // Audio
  turnAudio = SoundController.getAudio('droidTurn');

  // Animation variables
  animationTime: number = 0;
  currentSprite: Sprite = RobotSprites.SPRITES.left[0];
  currentAnimAction: RobotAnimAction = RobotAnimAction.STAND_RIGHT;
  iterationNumber: number = 0;
  lastRenderedAction: RobotAnimAction = RobotAnimAction.STAND_RIGHT;
  rotationSpeed: number;
  isRotating: boolean = false;

  // Behaviour variables
  movementData: MovementData;
  currentAction: RobotAction;
  previousAction: RobotAction;
  currentAttackDuration: number = null; // used both for normal attack and on see player attack
  currentAttackBreakDuration: number = null; // used for player vision triggered attack
  isAttacking: boolean = false; // used both for normal attack and on see player attack
  isAttackBreak: boolean = false;

  //Robot properties
  actionsQueue: ActionsQueue;
  specialBehaviour: RobotSpecialBehaviour;
  followPlayerProps?: RobotFollowPlayerProperties;
  attackWhenSeePlayerProps?: RobotAttackWhenSeePlayerProperties;
  currentFollowDuration: number = 0;

  // Laser
  laser: RobotLaser = new RobotLaser();

  constructor(movementData: MovementData) {
    super(
      movementData.fromX * 24,
      movementData.y * 24 -
        RobotSprites.SPRITES.left[0].getRealDimensions().y +
        robotHitboxYOffset +
        6,
      RobotSprites.SPRITES.left[0].getRealDimensions().x,
      RobotSprites.SPRITES.left[0].getRealDimensions().y - robotHitboxYOffset
    );

    const newRobotProperties = RobotPropertiesPreparer.getRobotProperties();
    this.actionsQueue = newRobotProperties.actionsQueue;
    this.rotationSpeed = newRobotProperties.rotationSpeed;
    this.movementData = {
      fromX: movementData.fromX * 24,
      y:
        movementData.y * 24 -
        RobotSprites.SPRITES.left[0].getRealDimensions().y +
        6,
      toX:
        movementData.toX * 24 -
        RobotSprites.SPRITES.left[0].getRealDimensions().x,
    };
    this.currentAction = this.actionsQueue[0];
    this.previousAction = null;
    this.followPlayerProps = newRobotProperties.followPlayerProps;
    this.attackWhenSeePlayerProps = newRobotProperties.attackWhenSeePlayerProps;
    this.specialBehaviour = newRobotProperties.specialBehaviour;
  }

  getClampedXPos(x: number) {
    return Utils.clamp(x, this.movementData.fromX, this.movementData.toX);
  }

  getNextAction() {
    const currentActionIndex = this.actionsQueue.indexOf(this.currentAction);
    let nextActionIndex = currentActionIndex + 1;
    if (nextActionIndex === this.actionsQueue.length) {
      nextActionIndex = 0;
    }

    return this.actionsQueue[nextActionIndex];
  }

  orderRotationIfNecessary(wantedDirection: number): boolean {
    if (
      this.currentAnimAction === RobotAnimAction.STAND_LEFT &&
      wantedDirection === 1
    ) {
      this.currentAnimAction = RobotAnimAction.ROTATE_LEFT_RIGHT;
      return true;
    }
    if (
      this.currentAnimAction === RobotAnimAction.STAND_RIGHT &&
      wantedDirection === -1
    ) {
      this.currentAnimAction = RobotAnimAction.ROTATE_RIGHT_LEFT;
      return true;
    }
    return false;
  }

  handleBehaviour(dt: number) {
    let actionFinished = false;
    switch (this.currentAction.type) {
      case RobotActionTypes.MOVE:
        if (this.followPlayerProps !== undefined) {
          if (this.handleFollowMoveAction(dt)) actionFinished = true;
        } else {
          if (this.handleMoveAction(dt, this.currentAction))
            actionFinished = true;
        }
        break;
      case RobotActionTypes.ATTACK:
        if (this.attackWhenSeePlayerProps === undefined) {
          if (this.handleAttackAction(dt, this.currentAction))
            actionFinished = true;
        } else actionFinished = true;
        break;
    }

    if (actionFinished) {
      this.previousAction = this.currentAction;
      this.currentAction = this.getNextAction();
    }
  }

  getDestPosition(destXPercentage: number) {
    const robotMovePathLength = this.movementData.toX - this.movementData.fromX;
    const distanceFromStartingX = (robotMovePathLength * destXPercentage) / 100;
    return this.movementData.fromX + distanceFromStartingX;
  }

  getRobotDirection(): XDirection {
    return this.currentAnimAction === RobotAnimAction.STAND_LEFT
      ? 'left'
      : 'right';
  }

  handleAttackWhenSeePlayer(dt: number): boolean {
    const { attackDuration, attacksBreakDuration } =
      this.attackWhenSeePlayerProps;
    const [doesSeePlayer, dir] = this.checkIfSeePlayer();

    if (doesSeePlayer && !this.isAttacking) {
      this.laser.activateLaser(this, dir === 1 ? 'right' : 'left');
      this.currentAttackDuration = 0;
      this.isAttacking = true;
    } else if (doesSeePlayer && this.isAttacking) {
      if (!this.isAttackBreak) this.currentAttackDuration += dt;
      if (this.currentAttackDuration >= attackDuration) {
        // starting attack break
        this.isAttackBreak = true;
        this.currentAttackDuration = 0;
        this.laser.isActive = false;
      }
      if (this.isAttackBreak) this.currentAttackBreakDuration += dt;
      if (this.currentAttackBreakDuration >= attacksBreakDuration) {
        // start attack
        this.isAttackBreak = false;
        this.currentAttackBreakDuration = 0;
        this.laser.activateLaser(this, dir === 1 ? 'right' : 'left');
      }
    } else if (!doesSeePlayer) {
      this.isAttacking = false;
      this.laser.isActive = false;
    }
    return doesSeePlayer;
  }

  checkIfSeePlayer(): [boolean, number] /*doesSee, direction*/ {
    const isCollidingOnY = Player.t < this.b && Player.b > this.t;
    if (isCollidingOnY === false) return [false, null];

    const playerXCenter = Player.l + Player.w / 2;
    const robotXCenter = this.l + this.w / 2;
    const dir = Math.sign(playerXCenter - robotXCenter);
    const currentRobotRotation =
      this.currentAnimAction === RobotAnimAction.STAND_LEFT
        ? -1
        : this.currentAnimAction === RobotAnimAction.STAND_RIGHT
        ? 1
        : undefined;

    return [dir === currentRobotRotation, dir];
  }

  handleAttackAction(dt: number, action: RobotAttackAction): boolean {
    if (!this.isAttacking) {
      this.isAttacking = true;
      let direction: XDirection;
      if (action.attackDirection) {
        direction = action.attackDirection;
      } else {
        direction = this.getRobotDirection();
      }
      this.orderRotationIfNecessary(direction === 'left' ? -1 : 1);
      this.currentAttackDuration = 0;
    } else {
      if (!this.isRotating) {
        this.laser.activateLaser(this, this.getRobotDirection());
        this.currentAttackDuration += dt * 1000;
        if (this.currentAttackDuration >= action.attackDuration) {
          this.isAttacking = false;
          this.laser.isActive = false;
          return true;
        }
      }
    }

    return false;
  }

  handleFollowMoveAction(dt: number): boolean {
    if (this.isRotating) {
      this.vx = 0;
      return true;
    }
    const followProperties = this.followPlayerProps;
    this.currentFollowDuration += dt * 1000;
    if (this.currentFollowDuration > followProperties.followDuration) {
      this.currentFollowDuration = 0;
      this.vx = 0;
      return true;
    }

    const speed = followProperties.followSpeed;
    const playerXCenter = Player.l + Player.w / 2;
    const robotXCenter = this.l + this.w / 2;
    const dir = Math.sign(playerXCenter - robotXCenter);
    const isRotationNeeded = this.orderRotationIfNecessary(dir);
    if (isRotationNeeded) return false;
    let vx = dir * speed;
    let distanceFromBorder: number = 0;
    if (dir === -1) {
      distanceFromBorder = this.l - this.movementData.fromX;
    }
    if (dir === 1) {
      distanceFromBorder = this.movementData.toX - this.l;
    }
    if (distanceFromBorder < Math.abs(vx * dt)) {
      vx = (distanceFromBorder / dt) * dir;
    }

    this.vx = vx;
    return false;
  }

  renderMovementArea(color: string = '#ff0000') {
    const ctx = State.canvas.ctx;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    const { y, fromX, toX } = this.movementData;
    ctx.strokeRect(
      fromX,
      y,
      toX - fromX + RobotSprites.SPRITES.right[0].getRealDimensions().x,
      RobotSprites.SPRITES.right[0].getRealDimensions().y
    );
  }

  handleMoveAction(dt: number, action: RobotMoveAction): boolean {
    const destPos = this.getDestPosition(action.destinationXPercentage);
    const xPosDiff = destPos - this.l;
    let speed = action.xVelocity * dt;
    if (Math.abs(xPosDiff) < speed) {
      speed = Math.abs(xPosDiff);
    }
    const dir = Math.sign(xPosDiff); // 1 right, -1 left, 0 next action
    this.orderRotationIfNecessary(dir);

    if (dir === 0 || this.isRotating) {
      this.vx = 0;
    }

    if (this.isRotating) {
      return false;
    }
    if (
      this.specialBehaviour === RobotSpecialBehaviour.ATTACK_WHEN_SEE_PLAYER
    ) {
      const isSeeingPlayer = this.handleAttackWhenSeePlayer(dt);
      if (isSeeingPlayer) {
        this.vx = 0;
        return false;
      }
    }

    if (dir === 0) {
      return true;
    }

    this.vx = (speed * dir) / dt;
    return false;
  }

  animate(
    dt: number,
    animationFrames: Sprite[],
    speed: number,
    maxIterationsNumber: number,
    onIterationCycleEnd: () => void
  ) {
    this.animationTime += dt * speed;
    let animFrameIndex = Math.floor(this.animationTime);
    if (animFrameIndex >= animationFrames.length) {
      animFrameIndex = 0;
      this.animationTime = 0;
      this.iterationNumber++;
    }

    const newSprite = animationFrames[animFrameIndex];

    this.currentSprite = newSprite;

    if (this.iterationNumber === maxIterationsNumber) {
      onIterationCycleEnd();
    }
  }

  handleAnimation(dt: number) {
    let animFrames: Sprite[] = [];
    let animSpeed = 5;
    let animIterations = 0;

    switch (this.currentAnimAction) {
      case RobotAnimAction.STAND_LEFT:
        if (SoundController.isPlaying(this.turnAudio)) {
          SoundController.stop(this.turnAudio);
        }
        animIterations = Infinity;
        animSpeed = 5;
        animFrames = RobotSprites.SPRITES.left;
        break;
      case RobotAnimAction.STAND_RIGHT:
        if (SoundController.isPlaying(this.turnAudio)) {
          SoundController.stop(this.turnAudio);
        }
        animIterations = Infinity;
        animSpeed = 5;
        animFrames = RobotSprites.SPRITES.right;
        break;
      case RobotAnimAction.ROTATE_LEFT_RIGHT:
        if (!SoundController.isPlaying(this.turnAudio)) {
          SoundController.play(this.turnAudio);
        }
        animIterations = 1;
        animSpeed = this.rotationSpeed;
        animFrames = RobotSprites.SPRITES.leftToRight;
        this.isRotating = true;
        break;
      case RobotAnimAction.ROTATE_RIGHT_LEFT:
        if (!SoundController.isPlaying(this.turnAudio)) {
          SoundController.play(this.turnAudio);
        }
        animIterations = 1;
        animSpeed = this.rotationSpeed;
        animFrames = RobotSprites.SPRITES.rightToLeft;
        this.isRotating = true;
        break;
    }
    if (this.currentAnimAction !== this.lastRenderedAction) {
      this.iterationNumber = 0;
    }

    const handleIterationCycleEnd = () => {
      switch (this.currentAnimAction) {
        case RobotAnimAction.ROTATE_LEFT_RIGHT:
          this.currentAnimAction = RobotAnimAction.STAND_RIGHT;
          this.isRotating = false;
          break;
        case RobotAnimAction.ROTATE_RIGHT_LEFT:
          this.currentAnimAction = RobotAnimAction.STAND_LEFT;
          this.isRotating = false;
          break;
      }
    };
    this.animate(
      dt,
      animFrames,
      animSpeed,
      animIterations,
      handleIterationCycleEnd
    );
    this.lastRenderedAction = this.currentAnimAction;
  }

  updatePosition(dt: number) {
    this.vy = 0;

    this.ob = this.b; // update the old positions to the current positions
    this.ol = this.l;
    this.or = this.r;
    this.ot = this.t;

    this.l += this.vx * dt; // update the current positions to the new positions
    this.t += this.vy * dt;
    this.r = this.l + this.w;
    this.b = this.t + this.h;
  }

  update(dt: number) {
    if (this.isColliding(Player) && Player.isAnimatingDeath == false) {
      SoundController.play('dieByZap');
      Player.kill();
    }
    this.handleBehaviour(dt);
    this.updatePosition(dt);
    this.laser.update(dt);
    this.handleAnimation(dt);
  }

  render(dt: number) {
    Assets.robotSprites.renderSprite(
      this.currentSprite,
      new Vector(this.l, this.t - robotHitboxYOffset)
    );
    this.laser.render(dt);
    // this.renderMovementArea();
  }
}
