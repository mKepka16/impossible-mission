import { IRenderable } from '../collisions/IRenderable';
import { Rectangle } from '../collisions/Rectangle';
import Assets from '../general/Assets';
import Debugger from '../general/Debugger';
import SoundController from '../general/SoundController';
import Vector from '../general/Vector';
import RobotSprites from '../sprites/RobotSprites';
import Player from './Player';

class Ball extends Rectangle implements IRenderable {
  time: number = 0;
  startingX: number;
  startingY: number;

  constructor(l: number, t: number) {
    super(
      l,
      t,
      RobotSprites.SPRITES.ball.getRealDimensions().x,
      RobotSprites.SPRITES.ball.getRealDimensions().y
    );
    this.startingX = l;
    this.startingY = t;
  }

  update(dt: number) {
    const speed = 3;
    const movementSize = 270;
    this.time += dt * speed;
    const scale = 2 / (3 - Math.cos(2 * this.time));
    this.setLeft(this.startingX + movementSize * scale * Math.cos(this.time));
    this.setTop(
      (this.startingY + movementSize * scale * Math.sin(2 * this.time)) / 2
    );
    if (this.isColliding(Player) && Player.isAnimatingDeath === false) {
      SoundController.play('dieByZap');
      Player.kill();
    }
  }

  render() {
    Assets.robotSprites.renderSprite(
      RobotSprites.SPRITES.ball,
      new Vector(this.l, this.t)
    );
    if (Debugger.showEnemiesHitboxes) {
      this.drawColliders('#ffffff');
    }
  }
}

export default Ball;
