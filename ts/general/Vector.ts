import Utils from './Utils';

class Vector {
  public x: number;
  public y: number;

  static zero = new Vector(0, 0);

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static addVectors(vector1: Vector, vector2: Vector): Vector {
    return new Vector(vector1.x + vector2.x, vector1.y + vector2.y);
  }

  add(v: Vector) {
    return new Vector(this.x + v.x, this.y + v.y);
  }

  mult(n: number) {
    return new Vector(this.x * n, this.y * n);
  }

  static multiply(vector: Vector, n: number): Vector {
    return new Vector(n * vector.x, n * vector.y);
  }

  static divide(vector: Vector, n: number): Vector {
    return new Vector(vector.x / n, vector.y / n);
  }

  static divideVectors(v1: Vector, v2: Vector): Vector {
    return new Vector(v1.x / (v2.x || 1), v1.y / (v2.y || 1));
  }

  static multiplyVectors(v1: Vector, v2: Vector): Vector {
    return new Vector(v1.x * v2.x, v1.y * v2.y);
  }

  static subtractVectors(vector1: Vector, vector2: Vector) {
    return new Vector(vector1.x - vector2.x, vector1.y - vector2.y);
  }

  static clamp(vector: Vector, min: Vector, max: Vector): Vector {
    return new Vector(
      Utils.clamp(vector.x, min.x, max.x),
      Utils.clamp(vector.y, min.y, max.y)
    );
  }

  clone() {
    return new Vector(this.x, this.y);
  }

  static swapX(v1: Vector, v2: Vector) {
    const temp = v1.x;
    v1.x = v2.x;
    v2.x = temp;
  }

  static swapY(v1: Vector, v2: Vector) {
    const temp = v1.y;
    v1.y = v2.y;
    v2.y = temp;
  }

  magnitude(): number {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  static normalize(vector1: Vector): Vector {
    const magnitude = vector1.magnitude();
    if (magnitude != 0) return Vector.multiply(vector1, 1 / magnitude);
    else return vector1;
  }

  norm() {
    const magnitude = this.magnitude();
    if (magnitude != 0) return Vector.multiply(this, 1 / magnitude);
    else return this.clone();
  }

  static dotProduct(v1: Vector, v2: Vector): number {
    const product = v1.x * v2.x + v1.y * v2.y;
    return product;
  }
}

export default Vector;
