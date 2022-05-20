import Sprite from './Sprite';
import Vector from '../general/Vector';

export type Pixel = [number, number, number];

export interface PixelChange {
  old: Pixel;
  new: Pixel;
}

class ThemedSprites {
  public static SCALE = 3;
  theme: PixelChange[];
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  plainSpritesSheet: HTMLImageElement;

  constructor(theme: PixelChange[], plainSpritesSheet: HTMLImageElement) {
    this.plainSpritesSheet = plainSpritesSheet;
    this.theme = theme;
    this.canvas = this.recolorImage(plainSpritesSheet);
    const canvas = document.querySelector('#root') as HTMLCanvasElement;
    this.context = canvas.getContext('2d');
  }

  reloadTheme() {
    this.canvas = this.recolorImage(this.plainSpritesSheet);
  }

  copyCanvas(canvas: HTMLCanvasElement): HTMLCanvasElement {
    const newCanvas = document.createElement('canvas');
    newCanvas.height = canvas.height;
    newCanvas.width = canvas.width;
    const newCanvasCtx = newCanvas.getContext('2d');
    newCanvasCtx.drawImage(canvas, 0, 0);
    return newCanvas;
  }

  static getCanvasPixelsData(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    return ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  }

  recolorImage(img: HTMLImageElement): HTMLCanvasElement {
    var c = document.createElement('canvas');
    var ctx = c.getContext('2d');
    var w = img.width;
    var h = img.height;

    c.width = w;
    c.height = h;

    // draw the image on the temporary canvas
    ctx.drawImage(img, 0, 0, w, h);

    // pull the entire image into an array of pixel data
    var imageData = ctx.getImageData(0, 0, w, h);

    // examine every pixel,
    // change any old rgb to the new-rgb
    for (var i = 0; i < imageData.data.length; i += 4) {
      // is this pixel the old rgb?
      this.theme.forEach((pixelChange) => {
        if (
          imageData.data[i] == pixelChange.old[0] &&
          imageData.data[i + 1] == pixelChange.old[1] &&
          imageData.data[i + 2] == pixelChange.old[2]
        ) {
          // change to your new rgb
          imageData.data[i] = pixelChange.new[0];
          imageData.data[i + 1] = pixelChange.new[1];
          imageData.data[i + 2] = pixelChange.new[2];
        }
      });
    }
    // put the altered data back on the canvas
    ctx.putImageData(imageData, 0, 0);
    // put the re-colored image back on the image
    return c;
  }

  renderSprite(sprite: Sprite, position: Vector) {
    this.context.drawImage(
      this.canvas,
      sprite.position.x,
      sprite.position.y,
      sprite.dimensions.x,
      sprite.dimensions.y,
      position.x + sprite.getRealOffset().x,
      position.y + sprite.getRealOffset().y,
      sprite.dimensions.x * ThemedSprites.SCALE,
      sprite.dimensions.y * ThemedSprites.SCALE
    );
  }
}

export default ThemedSprites;
