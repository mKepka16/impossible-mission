import { IRenderable } from '../collisions/IRenderable';
import { NoCollisionBox } from '../collisions/NoCollisionBox';
import Assets from '../general/Assets';
import State from '../general/State';
import Vector from '../general/Vector';
import SearchablesSprites from '../sprites/SearchablesSprites';
import Controls from './Controls';
import Eq from './Eq';

type SelectedOption = 'logout' | 'elevators' | 'robots';

class Terminal extends NoCollisionBox implements IRenderable {
  isTerminalVisible: boolean = false;
  selectedOption: SelectedOption = 'logout';
  keyDown: boolean = true;

  constructor(x: number, y: number) {
    super(
      new Vector(
        x * 24,
        y * 24 - SearchablesSprites.SPRITES.terminal.getRealDimensions().y
      ),
      SearchablesSprites.SPRITES.terminal.getRealDimensions()
    );
  }

  showTerminal() {
    this.isTerminalVisible = true;
    Controls.elevatorBlock = true;
    this.selectedOption = 'logout';
    this.keyDown = true;
  }

  logout() {
    this.isTerminalVisible = false;
    Controls.elevatorBlock = false;
  }

  update() {
    if (this.isCollidingWithPlayer() && Controls.up && !this.isTerminalVisible)
      this.showTerminal();
    if (this.isTerminalVisible) {
      if (
        Controls.up === false &&
        Controls.down === false &&
        Controls.confirmBtn === false
      )
        this.keyDown = false;
      if (this.keyDown === false && Controls.up) {
        this.moveUp();
        this.keyDown = true;
      }
      if (this.keyDown === false && Controls.down) {
        this.moveDown();
        this.keyDown = true;
      }
      if (this.keyDown === false && Controls.confirmBtn) {
        this.handleConfirm();
        this.keyDown = true;
      }
    }
  }

  handleConfirm() {
    if (this.selectedOption === 'logout') this.logout();
    if (this.selectedOption === 'robots') this.handleSnooze();
    if (this.selectedOption === 'elevators') this.handleElevatorsReset();
  }

  moveUp() {
    if (this.selectedOption === 'logout') this.selectedOption = 'robots';
    else if (this.selectedOption === 'robots')
      this.selectedOption = 'elevators';
  }

  moveDown() {
    if (this.selectedOption === 'elevators') this.selectedOption = 'robots';
    else if (this.selectedOption === 'robots') this.selectedOption = 'logout';
  }

  render() {
    Assets.searchablesSprites.renderSprite(
      SearchablesSprites.SPRITES.terminal,
      new Vector(this.pos.x, this.pos.y)
    );
  }

  renderTerminalView() {
    if (this.isTerminalVisible) {
      Assets.terminalSprites.renderAsset('terminal', Vector.zero);
      this.renderRoomNumber();
      this.renderSelectedOption();
      this.renderPassInfo();
    }
  }

  renderRoomNumber() {
    const ctx = State.canvas.ctx;
    ctx.font = '24px c64';
    ctx.fillStyle = '#DFF60A';
    const plainId = State.currentLevel.id.toString();
    const text = plainId.length > 1 ? plainId : '0' + plainId;
    ctx.fillText(text, 670, 93);
  }

  renderSelectedOption() {
    let arrowPos = new Vector(145, 405);
    if (this.selectedOption === 'robots') arrowPos.y = 235;
    if (this.selectedOption === 'elevators') arrowPos.y = 164;

    Assets.terminalSprites.renderAsset('arrow', arrowPos);
  }

  renderPassInfo() {
    const ctx = State.canvas.ctx;
    ctx.fillStyle = '#6A3304';
    if (this.shouldRenderSnoozePassReq || this.shouldRenderSnoozePassAcc) {
      ctx.fillRect(240, 230, 520, 70);
      if (this.shouldRenderSnoozePassReq)
        Assets.terminalSprites.renderAsset(
          'passwordRequired',
          new Vector(260, 230)
        );
      else
        Assets.terminalSprites.renderAsset(
          'passwordAccepted',
          new Vector(260, 230)
        );
    }
    if (this.shouldRenderLiftPassReq || this.shouldRenderLiftPassAcc) {
      ctx.fillRect(240, 150, 560, 70);
      if (this.shouldRenderLiftPassReq)
        Assets.terminalSprites.renderAsset(
          'passwordRequired',
          new Vector(260, 150)
        );
      else
        Assets.terminalSprites.renderAsset(
          'passwordAccepted',
          new Vector(260, 150)
        );
    }
  }

  shouldRenderLiftPassReq = false;
  shouldRenderLiftPassAcc = false;
  shouldRenderSnoozePassReq = false;
  shouldRenderSnoozePassAcc = false;

  handleSnooze() {
    if (Eq.snoozes > 0) {
      // start snooze
      State.currentLevel.startRobotSnooze();
      Eq.snoozes--;
      this.shouldRenderSnoozePassAcc = true;
      setTimeout(() => {
        this.shouldRenderSnoozePassAcc = false;
      }, 2000);
    } else {
      this.shouldRenderSnoozePassReq = true;
      setTimeout(() => {
        this.shouldRenderSnoozePassReq = false;
      }, 2000);
    }
  }

  handleElevatorsReset() {
    if (Eq.liftResets > 0) {
      // reset elevators
      State.currentLevel.resetLifts();
      Eq.liftResets--;
      this.shouldRenderLiftPassAcc = true;
      setTimeout(() => {
        this.shouldRenderLiftPassAcc = false;
      }, 2000);
    } else {
      this.shouldRenderLiftPassReq = true;
      setTimeout(() => {
        this.shouldRenderLiftPassReq = false;
      }, 2000);
    }
  }
}

export default Terminal;
