import State from '../general/State';

export type Action =
  | 'standLeft'
  | 'standRight'
  | 'runLeft'
  | 'runRight'
  | 'jumpLeft'
  | 'jumpRight'
  | 'fallingLeft'
  | 'searching'
  | 'fallingRight';

class Controls {
  left: boolean = false;
  right: boolean = false;
  jump: boolean = false;
  up: boolean = false;
  down: boolean = false;
  jumpLeft: boolean = false;
  jumpRight: boolean = false;
  confirmBtn: boolean = false;
  space: boolean = false;

  prevAction: Action = 'standRight';
  action: Action = 'standRight';
  actionBlock: boolean = false;
  absoluteBlock: boolean = false;
  elevatorBlock: boolean = false;
  searchBlock: boolean = false;

  isCursorMode: boolean = false;
  cursor = {
    left: false,
    right: false,
    up: false,
    down: false,
    space: false,
  };

  constructor() {
    window.addEventListener('keydown', (e) => this.handleKeyDown(e));
    window.addEventListener('keyup', (e) => this.handleKeyUp(e));
  }

  resetControls() {
    this.left = false;
    this.right = false;
    this.jump = false;
    this.up = false;
    this.down = false;
    this.jumpLeft = false;
    this.jumpRight = false;

    this.prevAction = 'standRight';
    this.action = 'standRight';
    this.actionBlock = false;
    this.absoluteBlock = false;
    this.elevatorBlock = false;
    this.searchBlock = false;
  }

  setAction(newAction: Action) {
    this.prevAction = this.action;
    this.action = newAction;
  }

  handleKeyDown(e: KeyboardEvent) {
    if (this.absoluteBlock) return;
    if (e.key == 'd' || e.key == 'ArrowRight') {
      if (this.isCursorMode) {
        this.cursor.right = true;
        return;
      }
      if (this.searchBlock) return;
      if (this.elevatorBlock) return;
      if (!this.actionBlock) this.setAction('runRight');
      this.right = true;
      this.left = false;
    }
    if (e.key == 'a' || e.key == 'ArrowLeft') {
      if (this.isCursorMode) {
        this.cursor.left = true;
        return;
      }
      if (this.searchBlock) return;
      if (this.elevatorBlock) return;
      if (!this.actionBlock) this.setAction('runLeft');
      this.right = false;
      this.left = true;
    }
    if (e.key == 'w' || e.key == 'ArrowUp') {
      if (this.isCursorMode) {
        this.cursor.up = true;
        return;
      }
      if (!this.actionBlock) this.up = true;
    }
    if (e.key == 's' || e.key == 'ArrowDown') {
      if (this.isCursorMode) {
        this.cursor.down = true;
        return;
      }
      if (!this.actionBlock) this.down = true;
    }
    if (e.key == ' ') {
      if (this.isCursorMode) {
        this.cursor.space = true;
        return;
      }
      if (this.actionBlock) return;
      if (this.searchBlock) return;
      if (this.elevatorBlock) {
        this.confirmBtn = true;
        return;
      }
      if (
        this.action === 'runLeft' ||
        (this.action === 'standLeft' && State.scene === 'Room')
      ) {
        this.setAction('jumpLeft');
        this.jumpLeft = true;
        this.jump = true;
      }
      if (
        this.action === 'runRight' ||
        (this.action === 'standRight' && State.scene === 'Room')
      ) {
        this.setAction('jumpRight');
        this.jumpRight = true;
        this.jump = true;
      }
      this.space = true;
    }
  }

  handleKeyUp(e: KeyboardEvent) {
    if (this.absoluteBlock) return;
    if (e.key == 'd' || e.key == 'ArrowRight') {
      this.cursor.right = false;
      if (!this.actionBlock && this.action === 'runRight')
        this.setAction('standRight');
      this.right = false;
    } else if (e.key == 'a' || e.key == 'ArrowLeft') {
      this.cursor.left = false;
      if (!this.actionBlock && this.action === 'runLeft')
        this.setAction('standLeft');
      this.left = false;
    } else if (e.key == 'w' || e.key == 'ArrowUp') {
      this.cursor.up = false;
      this.up = false;
    }
    if (e.key == 's' || e.key == 'ArrowDown') {
      this.cursor.down = false;
      return (this.down = false);
    }
    if (e.key === ' ') {
      this.cursor.space = false;
      this.confirmBtn = false;
      this.space = false;
    }
  }
}

export default new Controls();
