export type Action =
  | 'standLeft'
  | 'standRight'
  | 'runLeft'
  | 'runRight'
  | 'jumpLeft'
  | 'jumpRight'
  | 'fallingLeft'
  | 'fallingRight';

class Controls {
  left: boolean = false;
  right: boolean = false;
  jump: boolean = false;
  up: boolean = false;
  down: boolean = false;
  jumpLeft: boolean = false;
  jumpRight: boolean = false;

  prevAction: Action = 'standRight';
  action: Action = 'standRight';
  actionBlock: boolean = false;
  absoluteBlock: boolean = false;

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
  }

  setAction(newAction: Action) {
    this.prevAction = this.action;
    this.action = newAction;
  }

  handleKeyDown(e: KeyboardEvent) {
    if (this.absoluteBlock) return;
    if (e.key == 'd' || e.key == 'ArrowRight') {
      if (!this.actionBlock) this.setAction('runRight');
      this.right = true;
    }
    if (e.key == 'a' || e.key == 'ArrowLeft') {
      if (!this.actionBlock) this.setAction('runLeft');
      this.left = true;
    }
    if (!this.actionBlock && (e.key == 'w' || e.key == 'ArrowUp')) {
      this.up = true;
    }
    if (!this.actionBlock && (e.key == 's' || e.key == 'ArrowDown')) {
      this.down = true;
    }
    if (!this.actionBlock && e.key == ' ') {
      if (this.action === 'runLeft' || this.action === 'standLeft') {
        this.setAction('jumpLeft');
        this.jumpLeft = true;
      }
      if (this.action === 'runRight' || this.action === 'standRight') {
        this.setAction('jumpRight');
        this.jumpRight = true;
      }
      this.jump = true;
    }
  }

  handleKeyUp(e: KeyboardEvent) {
    if (this.absoluteBlock) return;
    if (e.key == 'd' || e.key == 'ArrowRight') {
      if (!this.actionBlock && this.action === 'runRight')
        this.setAction('standRight');
      this.right = false;
    } else if (e.key == 'a' || e.key == 'ArrowLeft') {
      if (!this.actionBlock && this.action === 'runLeft')
        this.setAction('standLeft');
      this.left = false;
    } else if (e.key == 'w' || e.key == 'ArrowUp') {
      this.up = false;
    }
    if (e.key == 's' || e.key == 'ArrowDown') return (this.down = false);
  }
}

export default new Controls();
