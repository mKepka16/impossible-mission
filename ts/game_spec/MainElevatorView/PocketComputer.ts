import { IRenderable } from '../../collisions/IRenderable';
import Assets from '../../general/Assets';
import State from '../../general/State';
import Vector from '../../general/Vector';
import ElevatorCorridorSprites from '../../sprites/ElevatorCorridorSprites';
import PocketComputerSprites from '../../sprites/PocketComputerSprites';
import Controls from '../Controls';
import Eq from '../Eq';
import MiniMap from './MiniMap';
import PocketComputerButton from './PocketComputerButton';
import PuzzlesManager from './PuzzlesManager';

const pocketComputerTopOffset = 360;

class PocketComputer implements IRenderable {
  password: string = '         ';
  fullPassword: string = 'ASPARAGUS';
  isDragging: boolean = false;
  cursorPos: Vector = new Vector(480, 400);
  buttons = {
    off: new PocketComputerButton(
      238 * 3,
      pocketComputerTopOffset + 87,
      () => (Controls.isCursorMode = false)
    ),
    revertVert: new PocketComputerButton(
      238 * 3,
      pocketComputerTopOffset + 15,
      () => PuzzlesManager.vertMirrorSelectedPuzzle()
    ),
    revertHoriz: new PocketComputerButton(
      262 * 3,
      pocketComputerTopOffset + 15,
      () => PuzzlesManager.horMirrorSelectedPuzzle()
    ),
    delete: new PocketComputerButton(
      286 * 3,
      pocketComputerTopOffset + 15,
      () => PuzzlesManager.deleteSelectedPuzzle()
    ),
    green: new PocketComputerButton(
      238 * 3,
      pocketComputerTopOffset + 3 * 53,
      () => PuzzlesManager.setSelectedPuzzleColor('green')
    ),
    yellow: new PocketComputerButton(
      262 * 3,
      pocketComputerTopOffset + 3 * 53,
      () => PuzzlesManager.setSelectedPuzzleColor('yellow')
    ),
    blue: new PocketComputerButton(
      286 * 3,
      pocketComputerTopOffset + 3 * 53,
      () => PuzzlesManager.setSelectedPuzzleColor('blue')
    ),
    up: new PocketComputerButton(
      30,
      pocketComputerTopOffset + 15,
      () => PuzzlesManager.previousPuzzleItem(),
      true
    ),
    down: new PocketComputerButton(
      30,
      pocketComputerTopOffset + 29 * 3,
      () => PuzzlesManager.nextPuzzleItem(),
      true
    ),
  };

  revealLetter(puzzleNumber: number) {
    this.password =
      this.password.substring(0, puzzleNumber) +
      this.fullPassword[puzzleNumber] +
      this.password.substring(puzzleNumber + 1);
  }

  update(dt: number) {
    MiniMap.update(dt);
    this.handleCursorMode();
    if (Controls.isCursorMode) {
      this.handleCursor(dt);
      Object.keys(this.buttons).forEach((key) => {
        this.buttons[key as keyof typeof this.buttons].update(this.cursorPos);
      });
      PuzzlesManager.update(dt, this.cursorPos);
    }
  }

  render(dt: number) {
    this.renderPocketComputer();
    if (Controls.isCursorMode) {
      this.renderPuzzleView();
      if (this.isDragging === false) this.renderCursor();
      Object.keys(this.buttons).forEach((key) => {
        this.buttons[key as keyof typeof this.buttons].render();
      });
    } else {
      this.renderMiniMap(dt);
    }
  }

  renderPuzzleView() {
    this.renderPassword();
    this.renderSnoozes();
    this.renderLiftInits();
    this.renderTime();
    this.renderTubes();
    PuzzlesManager.render();
  }

  renderTubes() {
    Assets.pocketComputerSprites.renderSprite(
      PocketComputerSprites.SPRITES.leftTube,
      new Vector(49 * 3, pocketComputerTopOffset + 3 * 8)
    );
    Assets.pocketComputerSprites.renderSprite(
      PocketComputerSprites.SPRITES.rightTube,
      new Vector(106 * 3, pocketComputerTopOffset + 3 * 8)
    );
  }

  renderPassword() {
    const ctx = State.canvas.ctx;
    ctx.font = '24px c64';
    ctx.fillStyle = '#1DD21F';
    ctx.fillText(`PSW:${this.password}`, 150, 576);
  }
  renderTime() {
    const ctx = State.canvas.ctx;
    ctx.font = '24px c64';
    ctx.fillStyle = '#30E6C6';
    ctx.fillText(State.getTime(), 480, 576);
  }
  renderSnoozes() {
    const ctx = State.canvas.ctx;
    ctx.font = '24px c64';
    ctx.fillStyle = '#B41AE2';
    ctx.fillText(`SNOOZES `, 150, 546);
    ctx.fillStyle = '#DFF60C';
    ctx.fillText(Eq.snoozes.toString(), 330, 546);
  }

  renderLiftInits() {
    const ctx = State.canvas.ctx;
    ctx.font = '24px c64';
    ctx.fillStyle = '#B41AE2';
    ctx.fillText(`LIFT INITS `, 400, 546);
    ctx.fillStyle = '#DFF60C';
    ctx.fillText(Eq.liftResets.toString(), 650, 546);
  }

  handleCursor(dt: number) {
    const speed = 400 * dt;
    if (Controls.cursor.left) this.cursorPos.x = this.cursorPos.x - speed;
    if (Controls.cursor.right) this.cursorPos.x = this.cursorPos.x + speed;
    if (Controls.cursor.up) this.cursorPos.y = this.cursorPos.y - speed;
    if (Controls.cursor.down) this.cursorPos.y = this.cursorPos.y + speed;
    const minY = 370;
    const maxY = 550;
    const minX = this.isDragging ? 150 : 10;
    const maxX = this.isDragging ? 600 : 900;

    if (this.cursorPos.y < minY) this.cursorPos.y = minY;
    if (this.cursorPos.y > maxY) this.cursorPos.y = maxY;
    if (this.cursorPos.x < minX) this.cursorPos.x = minX;
    if (this.cursorPos.x > maxX) this.cursorPos.x = maxX;
  }

  renderCursor() {
    Assets.pocketComputerSprites.renderSprite(
      PocketComputerSprites.SPRITES.cursor,
      this.cursorPos
    );
  }

  renderMiniMap(dt: number) {
    Assets.elevatorCorridorSprites.renderSprite(
      ElevatorCorridorSprites.SPRITES.minimapBorder,
      new Vector(175, 480 - 88.5)
    );
    MiniMap.render(dt);
  }

  handleCursorMode() {
    const isElevatorMoving = State.currentElevator.mainElevator.isMoving;
    if (
      Controls.isCursorMode === false &&
      Controls.left === false &&
      Controls.right === false &&
      State.scene === 'Elevator' &&
      isElevatorMoving === false &&
      Controls.jump
    ) {
      console.log('setting cursor mode true');
      this.cursorPos = new Vector(480, 400);
      Controls.isCursorMode = true;
    }
  }

  renderPocketComputer() {
    Assets.elevatorCorridorSprites.renderSprite(
      ElevatorCorridorSprites.SPRITES.pocketComputer,
      new Vector(
        0,
        State.canvas.height -
          ElevatorCorridorSprites.SPRITES.pocketComputer.getRealDimensions().y
      )
    );
  }
}

export default new PocketComputer();
