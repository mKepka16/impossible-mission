import ThemedSprites, { Pixel, PixelChange } from './ThemedSprites';
import Sprite from './Sprite';
import Vector from '../general/Vector';
import State from '../general/State';
import Utils from '../general/Utils';

const theme: PixelChange[] = [
  {
    old: [1, 0, 0],
    new: [248, 248, 248],
  },
  {
    old: [11, 0, 0],
    new: [80, 80, 80],
  },
];

class PlayerSprites extends ThemedSprites {
  static SPRITES = {
    right: new Sprite(new Vector(9, 516), new Vector(12, 28)),
    left: new Sprite(new Vector(49, 516), new Vector(12, 28)),
    back: new Sprite(new Vector(78, 514), new Vector(17, 30)),
    runRight: [
      new Sprite(new Vector(7, 351), new Vector(17, 29)),
      new Sprite(new Vector(39, 350), new Vector(19, 30)),
      new Sprite(new Vector(73, 350), new Vector(22, 28)),
      new Sprite(new Vector(108, 349), new Vector(24, 29)),
      new Sprite(new Vector(143, 350), new Vector(22, 29)),
      new Sprite(new Vector(180, 351), new Vector(15, 29)),
      new Sprite(new Vector(219, 351), new Vector(13, 29)),
      new Sprite(new Vector(252, 351), new Vector(16, 29)),
      new Sprite(new Vector(284, 350), new Vector(19, 30)),
      new Sprite(new Vector(318, 350), new Vector(22, 28)),
      new Sprite(new Vector(353, 349), new Vector(24, 29)),
      new Sprite(new Vector(388, 350), new Vector(22, 29)),
      new Sprite(new Vector(425, 351), new Vector(15, 29)),
      new Sprite(new Vector(464, 351), new Vector(14, 29)),
    ],
    runLeft: [
      new Sprite(new Vector(11, 392), new Vector(17, 29)),
      new Sprite(new Vector(47, 391), new Vector(19, 30)),
      new Sprite(new Vector(80, 391), new Vector(22, 28)),
      new Sprite(new Vector(113, 390), new Vector(24, 29)),
      new Sprite(new Vector(150, 391), new Vector(22, 29)),
      new Sprite(new Vector(190, 392), new Vector(15, 29)),
      new Sprite(new Vector(223, 392), new Vector(13, 29)),
      new Sprite(new Vector(257, 392), new Vector(16, 29)),
      new Sprite(new Vector(292, 391), new Vector(19, 30)),
      new Sprite(new Vector(325, 391), new Vector(22, 28)),
      new Sprite(new Vector(358, 390), new Vector(24, 29)),
      new Sprite(new Vector(395, 391), new Vector(22, 29)),
      new Sprite(new Vector(435, 392), new Vector(15, 29)),
      new Sprite(new Vector(467, 392), new Vector(14, 29)),
    ],
    jumpRight: [
      new Sprite(new Vector(3, 439), new Vector(24, 22), -2),
      new Sprite(new Vector(45, 436), new Vector(17, 21), 2),
      new Sprite(new Vector(77, 430), new Vector(18, 19), -4),
      new Sprite(new Vector(105, 429), new Vector(24, 12), -1),
      new Sprite(new Vector(146, 425), new Vector(17, 15), -4),
      new Sprite(new Vector(184, 421), new Vector(14, 17), -4),
      new Sprite(new Vector(219, 421), new Vector(14, 15), 0),
      new Sprite(new Vector(251, 424), new Vector(22, 13), 3),
      new Sprite(new Vector(285, 425), new Vector(30, 14), 1),
      new Sprite(new Vector(323, 425), new Vector(25, 21), 1),
      new Sprite(new Vector(362, 427), new Vector(15, 31), 4),
      new Sprite(new Vector(399, 432), new Vector(16, 30), 5),
    ],
    jumpLeft: [
      new Sprite(new Vector(8, 480), new Vector(24, 22), -2),
      new Sprite(new Vector(43, 477), new Vector(17, 21), -2),
      new Sprite(new Vector(80, 471), new Vector(18, 19), -4),
      new Sprite(new Vector(116, 470), new Vector(24, 12), -1),
      new Sprite(new Vector(152, 466), new Vector(17, 15), -4),
      new Sprite(new Vector(187, 462), new Vector(14, 17), -4),
      new Sprite(new Vector(222, 462), new Vector(14, 15), 0),
      new Sprite(new Vector(252, 465), new Vector(22, 13), 3),
      new Sprite(new Vector(280, 466), new Vector(30, 14), 1),
      new Sprite(new Vector(317, 466), new Vector(25, 21), 1),
      new Sprite(new Vector(358, 468), new Vector(15, 31), 4),
      new Sprite(new Vector(390, 473), new Vector(16, 30), 5),
    ],
  };

  DEATH_ANIM_COLORS = {
    grayLight: [190, 190, 190] as Pixel,
    grayDark: [140, 140, 140] as Pixel,
    mainLight: [240, 240, 240] as Pixel,
    mainDark: [110, 110, 110] as Pixel,
  };

  constructor(plainSpritesSheet: HTMLImageElement) {
    super(theme, plainSpritesSheet);
  }

  getDeathSpriteCanvasesList(sprite: Sprite) {
    let lightCanvas = this.getDeathSpriteCanvas(sprite, 'light', 'normal');
    let darkCanvas = this.getDeathSpriteCanvas(sprite, 'dark', 'normal');
    const canvases: HTMLCanvasElement[] = [];

    while (lightCanvas !== null) {
      canvases.push(lightCanvas);
      canvases.push(darkCanvas);
      lightCanvas = this.getWithoutSomePixels(lightCanvas);
      darkCanvas = this.getWithoutSomePixels(darkCanvas);
    }

    return canvases;
  }

  renderDeathSprite(
    sprite: Sprite,
    position: Vector,
    theme: 'light' | 'dark',
    colors: 'normal' | 'grey'
  ) {
    const context = State.canvas.ctx;
    const spriteCanvas = this.getDeathSpriteCanvas(sprite, theme, colors);
    context.drawImage(
      spriteCanvas,
      0,
      0,
      sprite.dimensions.x,
      sprite.dimensions.y,
      position.x,
      position.y,
      sprite.dimensions.x * ThemedSprites.SCALE,
      sprite.dimensions.y * ThemedSprites.SCALE
    );
  }

  renderCanvas(canvas: HTMLCanvasElement, position: Vector) {
    const ctx = State.canvas.ctx;
    ctx.drawImage(
      canvas,
      position.x,
      position.y,
      canvas.width * ThemedSprites.SCALE,
      canvas.height * ThemedSprites.SCALE
    );
  }

  getWithoutSomePixels(c: HTMLCanvasElement): HTMLCanvasElement | null {
    const canvas = Utils.copyCanvas(c);
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    let numberOfPixels = 0;
    for (let i = 0; i < imageData.data.length; i += 4) {
      if (imageData.data[i + 3] !== 0) {
        numberOfPixels++;
      }
    }
    if (numberOfPixels == 0) return null;
    const firstRandomPixelIndex = Utils.getRandInt(0, numberOfPixels - 1);
    let secondRandomPixelIndex: number | undefined;
    if (numberOfPixels > 1) {
      secondRandomPixelIndex = Utils.getRandInt(0, numberOfPixels - 1, [
        firstRandomPixelIndex,
      ]);
    }

    let filledPixelIndex = 0;
    for (let i = 0; i < imageData.data.length; i += 4) {
      if (imageData.data[i + 3] !== 0) {
        if (
          filledPixelIndex === firstRandomPixelIndex ||
          filledPixelIndex === secondRandomPixelIndex
        ) {
          imageData.data[i + 3] = 0;
        }
        filledPixelIndex++;
      }
    }
    ctx.putImageData(imageData, 0, 0);
    return canvas;
  }

  getSpriteOnCanvas(sprite: Sprite): HTMLCanvasElement {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = sprite.dimensions.x;
    tempCanvas.height = sprite.dimensions.y;

    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(
      this.canvas,
      sprite.position.x,
      sprite.position.y,
      sprite.dimensions.x,
      sprite.dimensions.y,
      0,
      0,
      sprite.dimensions.x,
      sprite.dimensions.y
    );
    return tempCanvas;
  }

  getDeathSpriteCanvas(
    sprite: Sprite,
    theme: 'light' | 'dark',
    colors: 'normal' | 'grey'
  ): HTMLCanvasElement {
    const canvas = this.getSpriteOnCanvas(sprite);
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(
      0,
      0,
      sprite.dimensions.x,
      sprite.dimensions.y
    );
    const darkPixel: Pixel = [80, 80, 80];
    const lightPixel: Pixel = [248, 248, 248];

    let pixel1: Pixel;
    let pixel2: Pixel;

    if (colors === 'normal') {
      if (theme === 'light') {
        pixel1 = this.DEATH_ANIM_COLORS.mainLight;
        pixel2 = this.DEATH_ANIM_COLORS.mainDark;
      } else {
        pixel1 = this.DEATH_ANIM_COLORS.mainDark;
        pixel2 = this.DEATH_ANIM_COLORS.mainLight;
      }
    } else if (colors === 'grey') {
      if (theme === 'light') {
        pixel1 = this.DEATH_ANIM_COLORS.grayLight;
        pixel2 = this.DEATH_ANIM_COLORS.grayDark;
      } else {
        pixel1 = this.DEATH_ANIM_COLORS.grayDark;
        pixel2 = this.DEATH_ANIM_COLORS.grayLight;
      }
    }

    for (var i = 0; i < imageData.data.length; i += 4) {
      // is this pixel the old rgb?
      if (
        imageData.data[i] == darkPixel[0] &&
        imageData.data[i + 1] == darkPixel[1] &&
        imageData.data[i + 2] == darkPixel[2]
      ) {
        // change to your new rgb
        imageData.data[i] = pixel1[0];
        imageData.data[i + 1] = pixel1[1];
        imageData.data[i + 2] = pixel1[2];
      }

      if (
        imageData.data[i] == lightPixel[0] &&
        imageData.data[i + 1] == lightPixel[1] &&
        imageData.data[i + 2] == lightPixel[2]
      ) {
        // change to your new rgb
        imageData.data[i] = pixel2[0];
        imageData.data[i + 1] = pixel2[1];
        imageData.data[i + 2] = pixel2[2];
      }
    }
    // put the altered data back on the canvas
    ctx.putImageData(imageData, 0, 0);

    return canvas;
  }
}

export default PlayerSprites;
