import { NoCollisionBox } from '../../collisions/NoCollisionBox';
import Vector from '../../general/Vector';
import Controls from '../Controls';

class PocketComputerButton extends NoCollisionBox {
  onClick: () => void;
  isKeyDown: boolean = false;

  constructor(
    x: number,
    y: number,
    onClick: () => void,
    isBig: boolean = false
  ) {
    super(
      new Vector(x, y),
      isBig ? new Vector(26 * 3, 20 * 3) : new Vector(22 * 3, 23 * 3)
    );
    this.onClick = onClick;
  }

  isCursorPointing(cursorPos: Vector) {
    return (
      cursorPos.x > this.pos.x &&
      cursorPos.x < this.pos.x + this.dim.x &&
      cursorPos.y > this.pos.y &&
      cursorPos.y < this.pos.y + this.dim.y
    );
  }

  update(cursorPos: Vector) {
    if (
      this.isCursorPointing(cursorPos) &&
      Controls.cursor.space &&
      this.isKeyDown === false
    ) {
      this.onClick();
      this.isKeyDown = true;
    }
    if (Controls.cursor.space === false && this.isKeyDown === true)
      this.isKeyDown = false;
  }

  render() {
    this.drawBorders();
  }
}

export default PocketComputerButton;
