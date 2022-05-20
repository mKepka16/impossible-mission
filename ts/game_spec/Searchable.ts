import { IRenderable } from '../collisions/IRenderable';
import { NoCollisionBox } from '../collisions/NoCollisionBox';
import Assets from '../general/Assets';
import State from '../general/State';
import Utils from '../general/Utils';
import Vector from '../general/Vector';
import { levelsEntries } from '../presets/levels_presets';
import InfoSprites from '../sprites/InfoSprites';
import PlayerSprites from '../sprites/PlayerSprites';
import SearchablesSprites from '../sprites/SearchablesSprites';
import Sprite from '../sprites/Sprite';
import Controls from './Controls';
import Eq from './Eq';
import PuzzleItem from './MainElevatorView/PuzzleItem';

type SearchableType = keyof typeof SearchablesSprites.SPRITES;
const playerWidth = PlayerSprites.SPRITES.left.getRealDimensions().x;

type TreasureInfo =
  | 'no tresure'
  | 'robot sleep'
  | 'lift reset'
  | 'searching'
  | 'puzzle';

class Searchable extends NoCollisionBox implements IRenderable {
  type: SearchableType;
  isEmpty: boolean = false;
  searchStatus: TreasureInfo = null;
  searchProgress: number = Utils.getRandInt(0, 70);
  infoPos: Vector;
  spriteBeforeSearch: Sprite;
  currentPuzzle: PuzzleItem;
  get sprite() {
    return SearchablesSprites.SPRITES[this.type];
  }

  constructor(type: SearchableType, x: number, y: number) {
    super(new Vector(x * 24 + playerWidth / 2, y * 24), new Vector(0, 0));
    this.type = type;
    this.dim.x = this.sprite.getRealDimensions().x - playerWidth;
    this.dim.y = this.sprite.getRealDimensions().y;
    this.pos.y -= this.dim.y;
    this.infoPos = this.getInfoPosition();
  }

  getRandomTreasure(): Exclude<TreasureInfo, 'searching'> {
    State.searchablesLeftAmount--;
    if (State.searchablesLeftAmount <= Eq.availablePuzzlesIds.length) {
      this.currentPuzzle = Eq.getPuzzle();
      return 'puzzle';
    }
    const randInt = Utils.getRandInt(1, 4);
    if (randInt === 1) return 'no tresure';
    else if (randInt === 2) {
      Eq.snoozes++;
      return 'robot sleep';
    } else if (randInt === 3) {
      Eq.liftResets++;
      return 'lift reset';
    } else {
      this.currentPuzzle = Eq.getPuzzle();
      return 'puzzle';
    }
  }

  update(dt: number, g: number = 0, f: number = 0) {
    if (this.isEmpty) return;
    if (this.isCollidingWithPlayer() && Controls.up) {
      this.searchProgress += dt * 40;
      if (this.searchProgress > 100) {
        this.handleSearchFinished();
        this.isEmpty = true;
        Controls.searchBlock = false;
        Controls.setAction(Controls.prevAction);
      } else if (this.searchStatus !== 'searching') {
        this.searchStatus = 'searching';
        Controls.searchBlock = true;
        Controls.setAction('searching');
      }
    } else if (this.searchStatus === 'searching') {
      this.searchStatus = null;
      Controls.searchBlock = false;
      Controls.setAction(Controls.prevAction);
    }
  }

  handleSearchFinished() {
    const tresure = this.getRandomTreasure();
    this.searchStatus = tresure;
    setTimeout(() => {
      this.searchStatus = null;
    }, 1000);
  }

  render(dt: number) {
    if (!this.isEmpty) {
      Assets.searchablesSprites.renderSprite(
        this.sprite,
        new Vector(this.pos.x - playerWidth / 2, this.pos.y)
      );
    }

    // this.drawBorders();
    switch (this.searchStatus) {
      case 'no tresure':
        this.renderNothingHereInfo();
        break;
      case 'lift reset':
        this.renderLiftResetInfo();
        break;
      case 'robot sleep':
        this.renderRobotSleepInfo();
        break;
      case 'searching':
        this.renderSearchInProgressInfo();
        break;
      case 'puzzle':
        this.renderPuzzleInfo();
        break;
    }
  }

  getInfoPosition() {
    const furnitureMiddleX = this.pos.x + this.dim.x / 2;
    const mapMiddleX = State.canvas.width / 2;
    const isFurnitureOnTheLeftPartOfTheMap = furnitureMiddleX < mapMiddleX;
    const furnitureBottom = this.pos.y + this.dim.y;
    const furnitureGridBottom = furnitureBottom / 24;
    const infoBoxHeight = 4;
    const infoBoxWidth = 8;
    if (isFurnitureOnTheLeftPartOfTheMap) {
      const furnitureRight = this.pos.x + this.dim.x;
      const furnitureGridRight = Math.ceil(furnitureRight / 24);
      return new Vector(
        furnitureGridRight + 2,
        furnitureGridBottom - 2 - infoBoxHeight
      );
    } else {
      const furnitureLeft = this.pos.x;
      const furnitureGridLeft = Math.ceil(furnitureLeft / 24);
      return new Vector(
        furnitureGridLeft - 2 - infoBoxWidth,
        furnitureGridBottom - 2 - infoBoxHeight
      );
    }
  }

  renderSearchInProgressInfo() {
    const { x, y } = this.infoPos;
    const realX = x * 24;
    const realY = y * 24;
    const ctx = State.canvas.ctx;
    ctx.fillStyle = 'white';
    ctx.fillRect(realX, realY, 8 * 24, 4 * 24);
    const stepAmount = 20;
    const stepLength = 100 / stepAmount;
    const currentStepNumber = Math.floor(
      (100 - this.searchProgress) / stepLength
    );
    const searchBarLength = 8 * 24 * (currentStepNumber / stepAmount);

    ctx.fillStyle = levelsEntries[State.currentLevel?.id]?.color;
    ctx.fillRect(realX, realY + 3 * 24 - 12, searchBarLength, 12);

    ctx.font = '21px c64';
    ctx.fillStyle = levelsEntries[State.currentLevel?.id]?.color;
    ctx.fillText('Searching', realX, realY + 40);
  }

  renderPuzzleInfo() {
    const { x, y } = this.infoPos;
    const realX = x * 24;
    const realY = y * 24;
    const ctx = State.canvas.ctx;

    ctx.fillStyle = 'white';
    ctx.fillRect(realX, realY, 8 * 24, 4 * 24);

    const offset = new Vector(4 * 24 - 24 * 3, 2 * 24 - 21 * 1.5);
    this.currentPuzzle.render(new Vector(realX, realY).add(offset));

    console.log('rendering puzzle info');
  }

  renderNothingHereInfo() {
    const { x, y } = this.infoPos;
    const realX = x * 24;
    const realY = y * 24;
    const ctx = State.canvas.ctx;
    ctx.fillStyle = 'white';
    ctx.fillRect(realX, realY, 8 * 24, 4 * 24);

    ctx.font = '21px c64';
    ctx.fillStyle = levelsEntries[State.currentLevel?.id]?.color;
    ctx.fillText('Nothing', realX + 22, realY + 40);
    ctx.fillText('here.', realX + 52, realY + 80);
  }

  renderLiftResetInfo() {
    const { x, y } = this.infoPos;
    const realX = x * 24;
    const realY = y * 24;
    const ctx = State.canvas.ctx;
    ctx.fillStyle = 'white';
    ctx.fillRect(realX, realY, 8 * 24, 4 * 24);

    const iconDim = InfoSprites.SPRITES.platformsReset.getRealDimensions();

    Assets.infoSprites.renderSprite(
      InfoSprites.SPRITES.platformsReset,
      new Vector(realX + 4 * 24 - iconDim.x / 2, realY + 2 * 24 - iconDim.y / 2)
    );
  }

  renderRobotSleepInfo() {
    const { x, y } = this.infoPos;
    const realX = x * 24;
    const realY = y * 24;
    const ctx = State.canvas.ctx;
    ctx.fillStyle = 'white';
    ctx.fillRect(realX, realY, 8 * 24, 4 * 24);

    const iconDim = InfoSprites.SPRITES.sleepRobot.getRealDimensions();

    Assets.infoSprites.renderSprite(
      InfoSprites.SPRITES.sleepRobot,
      new Vector(realX + 4 * 24 - iconDim.x / 2, realY + 2 * 24 - iconDim.y / 2)
    );
  }
}

export default Searchable;
