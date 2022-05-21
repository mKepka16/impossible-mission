import Controls, { Action } from './Controls';

import Assets from '../general/Assets';
import { IRenderable } from '../collisions/IRenderable';
import Level from './Level';
import PlayerSprites from '../sprites/PlayerSprites';
import { Rectangle } from '../collisions/Rectangle';
import Sprite from '../sprites/Sprite';
import State from '../general/State';
import Vector from '../general/Vector';
import SoundController from '../general/SoundController';
import Debugger from '../general/Debugger';

class Player extends Rectangle implements IRenderable {
  jumping: boolean;
  fallingDown: boolean = true;
  isElevating: boolean = false;

  constructor(l: number, t: number) {
    super(
      l,
      t,
      PlayerSprites.SPRITES.right.getRealDimensions().x,
      PlayerSprites.SPRITES.right.getRealDimensions().y
    );

    this.jumping = true;
  }

  isAnimatingDeath: boolean = false;
  deathAnimationTime: number = 0;
  /**
   * Stage 0 - grey sprites
   * Stage 1 - normal sprites
   * Stage 2 - less and less pixels
   */
  deathAnimationStage: 0 | 1 | 2 = 0;
  deathAnimationSprite: Sprite;
  deathAnimationCanvases: HTMLCanvasElement[];
  deathAnimationMaxTime = {
    //stage : maxTime in s
    0: 0.5,
    1: 0.5,
    2: 1,
  };

  startDeathAnimation(sprite: Sprite) {
    Controls.absoluteBlock = true;
    this.isAnimatingDeath = true;
    this.deathAnimationTime = 0;
    this.deathAnimationStage = 0;
    this.deathAnimationSprite = sprite;
    this.deathAnimationCanvases =
      Assets.playerSprites.getDeathSpriteCanvasesList(sprite);
  }

  animateDeath(dt: number) {
    this.deathAnimationTime += dt;
    if (
      this.deathAnimationTime >=
      this.deathAnimationMaxTime[this.deathAnimationStage]
    ) {
      if (this.deathAnimationStage === 2) return this.resetPlayer();
      this.deathAnimationStage++;
      this.deathAnimationTime = 0;
    }
    switch (this.deathAnimationStage) {
      case 0:
        {
          const isLight = Math.floor(this.deathAnimationTime * 20) % 2 === 0;
          Assets.playerSprites.renderDeathSprite(
            this.deathAnimationSprite,
            new Vector(this.l, this.t),
            isLight ? 'light' : 'dark',
            'grey'
          );
        }
        break;
      case 1:
        {
          const isLight = Math.floor(this.deathAnimationTime * 20) % 2 === 0;
          Assets.playerSprites.renderDeathSprite(
            this.deathAnimationSprite,
            new Vector(this.l, this.t),
            isLight ? 'light' : 'dark',
            'normal'
          );
        }
        break;
      case 2:
        {
          const frameTime =
            this.deathAnimationMaxTime[2] / this.deathAnimationCanvases.length;
          const frameIndex = Math.floor(this.deathAnimationTime / frameTime);
          const currentCanvas = this.deathAnimationCanvases[frameIndex];
          // render canvas
          Assets.playerSprites.renderCanvas(
            currentCanvas,
            new Vector(this.l, this.t)
          );
        }
        break;
    }
  }

  render(dt: number) {
    if (this.isAnimatingDeath) return this.animateDeath(dt);

    Assets.playerSprites.renderSprite(
      this.currentSprite,
      new Vector(this.l, this.t)
    );
    if (Debugger.showPlayerHitbox) this.drawColliders('#00ffff');
  }

  // Returns if player collide from the top
  collideRectangle(rectangle: Rectangle) {
    if (
      this.b < rectangle.t ||
      this.t > rectangle.b ||
      this.l > rectangle.r ||
      this.r < rectangle.l
    )
      return false;
    /* You can only collide with one side at a time, so "else if" is just fine. You don't need to separate the checks for x and y. Only one check can be true, so only one needs to be done. Once it's found, the other's don't need to be done. */
    if (this.b >= rectangle.t && this.ob < rectangle.ot) {
      this.setBottom(rectangle.t - 0.1);
      this.vy = rectangle.vy; // the platform moves the player with it after collision...
      if (this.jumping) {
        this.jumping = false;
        if (this.isAnimatingJump === false) {
          Controls.actionBlock = false;
          if (Controls.right) {
            Controls.setAction('runRight');
          } else if (Controls.left) {
            Controls.setAction('runLeft');
          }
        }
      }
      return true;
    } else if (this.t <= rectangle.b && this.ot > rectangle.ob) {
      this.setTop(rectangle.b + 0.1);
      this.vy = rectangle.vy; // ... regardless of what side the player collides with
    } else if (this.r >= rectangle.l && this.or < rectangle.ol) {
      this.setRight(rectangle.l - 0.1);
      this.vx = rectangle.vx;
    } else if (this.l <= rectangle.r && this.ol > rectangle.or) {
      this.setLeft(rectangle.r + 0.1);
      this.vx = rectangle.vx;
    }

    return true;
  }

  kill() {
    if (!this.isAnimatingDeath) this.startDeathAnimation(this.currentSprite);
  }

  update(dt: number, g: number, f: number) {
    const runningSpeed = 1.5;
    if (Controls.left && !Controls.actionBlock) this.vx -= runningSpeed;
    if (Controls.right && !Controls.actionBlock) this.vx += runningSpeed;

    if (Controls.jump && !this.jumping && !Controls.actionBlock) {
      this.jumping = true;
      Controls.actionBlock = true;
      this.vx = 0;
      this.vy = 0;
      State.gravity = 0;
      Controls.jump = false;
    }

    if (Controls.absoluteBlock) return;
    // gravity and friction
    this.vy += g; // you can make updates to velocity before or after the position update

    this.vx *= f; // I choose before so there isn't one frame of inactivity on the first cycle
    this.vy *= f;

    this.ob = this.b; // update the old positions to the current positions
    this.ol = this.l;
    this.or = this.r;
    this.ot = this.t;

    const multiplyer = 120;
    this.l += this.vx * dt * multiplyer; // update the current positions to the new positions
    this.t += this.vy * dt * multiplyer;
    this.r = this.l + this.w;
    this.b = this.t + this.h;

    if (this.fallingDown) {
      Controls.actionBlock = true;
      if (Controls.action === 'runRight') Controls.setAction('fallingRight');
      else if (Controls.action === 'runLeft') Controls.setAction('fallingLeft');
    } else if (!this.isAnimatingJump && !this.isElevating) {
      Controls.actionBlock = false;
      if (Controls.action === 'fallingLeft') Controls.setAction('standLeft');
      if (Controls.action === 'fallingRight') Controls.setAction('standRight');
    }

    this.handleAnimations(dt);
  }

  isAnimatingJump = false;
  animationTime = 0;
  currentSprite = PlayerSprites.SPRITES.right;

  lastAction: Action = 'standRight';
  handleAnimations(dt: number) {
    let animationFrames: Sprite[] = [PlayerSprites.SPRITES.left];

    if (Controls.action === 'runRight') {
      animationFrames = PlayerSprites.SPRITES.runRight;
    } else if (Controls.action === 'standRight') {
      animationFrames = [PlayerSprites.SPRITES.right];
    } else if (Controls.action === 'runLeft') {
      animationFrames = PlayerSprites.SPRITES.runLeft;
    } else if (Controls.action === 'standLeft') {
      animationFrames = [PlayerSprites.SPRITES.left];
    } else if (Controls.action === 'searching') {
      animationFrames = [PlayerSprites.SPRITES.back];
    } else if (Controls.action === 'jumpLeft') {
      animationFrames = PlayerSprites.SPRITES.jumpLeft;
      this.isAnimatingJump = true;
    } else if (Controls.action === 'jumpRight') {
      animationFrames = PlayerSprites.SPRITES.jumpRight;
      this.isAnimatingJump = true;
    } else if (Controls.action === 'fallingLeft') {
      animationFrames = [
        PlayerSprites.SPRITES.jumpLeft[
          PlayerSprites.SPRITES.jumpLeft.length - 1
        ],
      ];
    } else if (Controls.action === 'fallingRight') {
      animationFrames = [
        PlayerSprites.SPRITES.jumpRight[
          PlayerSprites.SPRITES.jumpRight.length - 1
        ],
      ];
    }

    if (Controls.action !== this.lastAction) {
      this.animationTime = 0;
    }
    this.lastAction = Controls.action;

    this.animate(
      dt,
      animationFrames,
      13,
      // 1,
      () => {
        if (this.isAnimatingJump) {
          if (
            Controls.action === 'jumpLeft' ||
            Controls.action === 'standLeft' ||
            Controls.action === 'runLeft'
          )
            Controls.setAction('fallingLeft');
          else if (
            Controls.action === 'jumpRight' ||
            Controls.action === 'standRight' ||
            Controls.action === 'runRight'
          )
            Controls.setAction('fallingRight');

          State.gravity = Level.DEFAULT_GRAVITY;
          this.isAnimatingJump = false;

          if (this.jumping === false) {
            Controls.actionBlock = false;
            if (
              Controls.action === 'jumpRight' ||
              Controls.action === 'fallingRight'
            ) {
              SoundController.play('jumpRight');
              Controls.setAction('runRight');
            } else if (
              Controls.action === 'jumpLeft' ||
              Controls.action === 'fallingLeft'
            ) {
              SoundController.play('jumpLeft');
              Controls.setAction('runLeft');
            }
          }
        }
      }
    );
  }

  lastFrameY: number;
  lastAnimationIndex = -1;
  animate(
    dt: number,
    animationFrames: Sprite[],
    speed: number,
    onCycleEnd: () => void = () => {}
  ) {
    this.animationTime += dt * speed;
    let animFrameIndex = Math.floor(this.animationTime);
    if (animFrameIndex === 0) {
      this.lastFrameY = this.t;
    }
    if (animFrameIndex >= animationFrames.length) {
      onCycleEnd();
      animFrameIndex = 0;
      this.animationTime = 0;
    }

    if (this.lastAnimationIndex !== animFrameIndex) {
      if (Controls.action === 'runLeft' && [2, 9].includes(animFrameIndex))
        SoundController.play('stepLeft');
      if (Controls.action === 'runRight' && [2, 9].includes(animFrameIndex))
        SoundController.play('stepRight');
    }

    this.lastAnimationIndex = animFrameIndex;

    const newSprite = animationFrames[animFrameIndex];

    if (Controls.action === 'jumpRight' || Controls.action === 'jumpLeft') {
      const animMovePercent = this.animationTime - animFrameIndex;
      if (this.currentSprite !== newSprite) {
        this.lastFrameY = this.t;
      }
      this.setLeft(
        this.l + 270 * dt * (Controls.action === 'jumpLeft' ? -1 : 1)
      );
      this.setTop(
        this.lastFrameY + newSprite.getRealOffsetT() * animMovePercent
      );
    }
    this.currentSprite = newSprite;

    this.correntHitbox();
  }

  correntHitbox() {
    const { x: spriteW, y: spriteH } = this.currentSprite.getRealDimensions();

    const xSizeDiff = this.w - spriteW;

    this.setLeft(this.l + xSizeDiff / 2);
    this.w = spriteW;
    this.h = spriteH;
  }

  resetPlayer() {
    this.animationTime = 0;
    this.currentSprite = PlayerSprites.SPRITES.right;
    this.deathAnimationCanvases = [];
    this.deathAnimationSprite = undefined;
    this.deathAnimationStage = 0;
    this.deathAnimationTime = 0;
    this.fallingDown = true;
    this.jumping = true;
    this.isElevating = false;
    this.isAnimatingDeath = false;
    this.isAnimatingJump = false;
    this.setLeft(State.currentLevel.playerStartingPosition.x);
    this.setTop(State.currentLevel.playerStartingPosition.y);
    this.ol = this.l;
    this.or = this.r;
    this.ot = this.t;
    this.ob = this.b;
    this.lastAction = 'standRight';
    this.lastFrameY = undefined;
    this.vx = 0;
    this.vy = 0;
    State.gravity = Level.DEFAULT_GRAVITY;
    Controls.resetControls();
    State.currentLevel.resetLifts();
  }
}

export default new Player(10, 0);
