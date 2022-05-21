import { IRenderable } from '../collisions/IRenderable';
import { Rectangle } from '../collisions/Rectangle';
import Assets from '../general/Assets';
import Debugger from '../general/Debugger';
import SoundController from '../general/SoundController';
import Vector from '../general/Vector';
import RobotLaserSprites from '../sprites/RobotLaserSprites';
import Sprite from '../sprites/Sprite';
import { IAnimated } from './IAnimated';
import Player from './Player';
import { robotHitboxYOffset } from './Robot';

const robotLaserWidthOffset = 15;

export class RobotLaser extends Rectangle implements IRenderable, IAnimated {
  animationTime: number = 0;
  currentSprite: Sprite = null;
  iterationNumber: number = 0;
  wasPreviouslyActive: boolean = false;
  isActive: boolean = false;
  currentSide: 'left' | 'right' = 'left';
  constructor() {
    super(
      0,
      0,
      RobotLaserSprites.SPRITES.laser[0].getRealDimensions().x -
        robotLaserWidthOffset,
      RobotLaserSprites.SPRITES.laser[0].getRealDimensions().y
    );
  }

  update(dt: number) {
    if (
      this.isActive &&
      this.isColliding(Player) &&
      Player.isAnimatingDeath === false
    ) {
      SoundController.play('dieByZap');
      Player.kill();
    }
    this.handleAnimation(dt);
  }

  activateLaser(robotPosition: Rectangle, side: 'left' | 'right') {
    // offsetFromTheTopOfTheRobotInSprite is 0;

    this.setTop(robotPosition.t - robotHitboxYOffset);
    if (side === 'left') this.setRight(robotPosition.l);
    else if (side === 'right') this.setLeft(robotPosition.r);
    this.currentSide = side;

    this.isActive = true;
  }

  render(dt: number) {
    if (this.currentSprite !== null) {
      const xOffset = this.currentSide === 'left' ? -robotLaserWidthOffset : 0;
      Assets.robotSprites.renderSprite(
        this.currentSprite,
        new Vector(this.l + xOffset, this.t)
      );
      if (Debugger.showEnemiesHitboxes) this.drawColliders('#ffffff');
    }
  }

  handleAnimation(dt: number) {
    const animSpeed = 20;
    const maxIterationsNumber = Infinity;

    if (this.wasPreviouslyActive === false && this.isActive === true) {
      this.animationTime = 0;
      this.iterationNumber = 0;
    }
    if (this.wasPreviouslyActive === true && this.isActive === false) {
      this.currentSprite = null;
    }
    if (this.isActive) {
      this.animate(
        dt,
        RobotLaserSprites.SPRITES.laser,
        animSpeed,
        maxIterationsNumber,
        () => {}
      );
    }

    this.wasPreviouslyActive = this.isActive;
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
}
