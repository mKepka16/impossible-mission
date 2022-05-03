import Player from '../game_spec/Player';
import State from '../general/State';
import Vector from '../general/Vector';

export class NoCollisionBox {
  pos: Vector; // top left corner
  dim: Vector;

  constructor(pos: Vector, dim: Vector) {
    this.pos = pos;
    this.dim = dim;
  }

  isCollidingWithPlayer() {
    return (
      Player.l < this.pos.x + this.dim.x &&
      Player.l + Player.w > this.pos.x &&
      Player.t < this.pos.y + this.dim.y &&
      Player.h + Player.t > this.pos.y
    );
  }

  drawBorders(color: string = '#ff0000') {
    const ctx = State.canvas.ctx;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.strokeRect(this.pos.x, this.pos.y, this.dim.x, this.dim.y);
  }
}
