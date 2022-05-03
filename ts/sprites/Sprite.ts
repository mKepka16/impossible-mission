import ThemedSprites from './ThemedSprites';
import Vector from '../general/Vector';

class Sprite {
  position: Vector;
  dimensions: Vector;
  offsetT: number;
  realDimensions: Vector;
  realOffset: Vector;

  constructor(
    position: Vector,
    dimensions: Vector,
    offsetT: number = 0,
    realDimensions: Vector = null,
    realOffset: Vector = new Vector(0, 0)
  ) {
    this.position = position;
    this.dimensions = dimensions;
    this.offsetT = offsetT;
    this.realDimensions = realDimensions || dimensions;
    this.realOffset = realOffset;
  }

  getRealDimensions() {
    return Vector.multiply(this.realDimensions, ThemedSprites.SCALE);
  }

  getSpriteDimensions() {
    return Vector.multiply(this.dimensions, ThemedSprites.SCALE);
  }

  getRealOffset() {
    return Vector.multiply(this.realOffset, ThemedSprites.SCALE);
  }

  getRealOffsetT() {
    return this.offsetT * ThemedSprites.SCALE;
  }
}

export default Sprite;
