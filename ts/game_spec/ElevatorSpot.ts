import BuildingsSprites from '../sprites/BuildingsSprites';
import { IGroupMember } from './IGroupMember';
import { IRenderable } from '../collisions/IRenderable';
import State from '../general/State';
import Vector from '../general/Vector';
import Debugger from '../general/Debugger';

export class ElevatorSpot implements IRenderable, IGroupMember {
  pos: Vector;
  group: number;

  constructor(l: number, t: number, group: number) {
    this.pos = new Vector(
      l * 24,
      t * 24 - BuildingsSprites.SPRITES.elevator.getRealOffset().y
    );
    this.group = group;
  }

  render() {
    if (Debugger.showLiftsHitboxes) this.drawSpotBorders();
  }

  drawSpotBorders(color: string = '#ff0000') {
    const ctx = State.canvas.ctx;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    const { x: w, y: h } =
      BuildingsSprites.SPRITES.elevator.getSpriteDimensions();
    const { x, y } = this.pos.add(
      BuildingsSprites.SPRITES.elevator.getRealOffset()
    );
    ctx.strokeRect(x, y, w, h);
  }
}
