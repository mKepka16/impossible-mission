class Utils {
  static clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }

  static clamp01(value: number): number {
    return this.clamp(value, 0, 1);
  }

  static Lerp(a: number, b: number, t: number) {
    return a + (b - a) * this.clamp01(t);
  }

  static InverseLerp = (a: number, b: number, value: number) =>
    a != b ? this.clamp01((value - a) / (b - a)) : 0;

  static getRandomByte = () => Math.floor(Math.random() * 256);

  static getRandInt = (from: number, to: number, not: number[] = []) => {
    let num = Math.floor(Math.random() * (to + 1 - from)) + from;
    while (not.includes(num)) {
      num = Math.floor(Math.random() * (to + 1 - from)) + from;
    }
    return num;
  };

  static copyCanvas(canvas: HTMLCanvasElement) {
    const newCanvas = document.createElement('canvas');
    const ctx = newCanvas.getContext('2d');
    newCanvas.width = canvas.width;
    newCanvas.height = canvas.height;
    ctx.drawImage(canvas, 0, 0);
    return newCanvas;
  }
}

export default Utils;
