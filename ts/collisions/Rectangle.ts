import State from '../general/State';

export class Rectangle {
  l: number;
  r: number;
  t: number;
  b: number;
  w: number;
  h: number;
  ol: number;
  or: number;
  ot: number;
  ob: number;
  vx: number;
  vy: number;

  constructor(l: number, t: number, w: number, h: number) {
    // left, top, width, height

    this.l = this.ol = l; // left and old left
    this.r = this.or = l + w; // right and old right
    this.t = this.ot = t; // top and old top
    this.b = this.ob = t + h; // bottom and old bottom
    this.w = w; // width
    this.h = h; // height
    this.vx = this.vy = 0; // velocity x and y
  }

  /* We can do calculations when we are setting the current position because the current position is new. Avoiding rounding errors isn't as important here. It is important when saving the current position to the old position, however, because the values must not change for the sake of accuracy. */
  setBottom(b: number) {
    this.b = b;
    this.t = b - this.h;
  }
  setLeft(l: number) {
    this.l = l;
    this.r = l + this.w;
  }
  setRight(r: number) {
    this.r = r;
    this.l = r - this.w;
  }
  setTop(t: number) {
    this.t = t;
    this.b = t + this.h;
  }

  drawColliders(color: string = '#ff0000') {
    const ctx = State.canvas.ctx;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.strokeRect(this.l, this.t, this.w, this.h);
  }

  isColliding(rect: Rectangle) {
    return (
      this.l < rect.r &&
      this.l + this.w > rect.l &&
      this.t < rect.b &&
      this.b > rect.t
    );
  }
}
