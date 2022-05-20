import PuzzleItem from '../game_spec/MainElevatorView/PuzzleItem';
import PuzzlesCombination from '../game_spec/MainElevatorView/PuzzlesCombination';
import Vector from '../general/Vector';
import { YELLOW } from '../presets/levels_presets';
import Sprite from './Sprite';
import ThemedSprites, { Pixel, PixelChange } from './ThemedSprites';

const topLeftAnchor = new Vector(449, 1);
const solvedPuzzlesTopLeftAnchor = new Vector(659, 1);
const puzzleItemSize = new Vector(48, 21);
const puzzlesGap = 4;
const puzzlesItemsGap = 2;

export const PUZZLES_COLORS = {
  green: [29, 210, 31] as Pixel,
  blue: [48, 230, 198] as Pixel,
  yellow: [223, 246, 12] as Pixel,
};

class PuzzlesSprites extends ThemedSprites {
  static SPRITES = {};

  constructor(
    plainSpritesSheet: HTMLImageElement,
    color: keyof typeof PUZZLES_COLORS
  ) {
    const theme: PixelChange[] = [
      {
        old: [0, 0, 0],
        new: PUZZLES_COLORS[color],
      },
    ];
    super(theme, plainSpritesSheet);
  }

  static getPuzzleSprite(puzzleNumber: number, puzzleItemNumber: number) {
    const x = puzzleItemNumber * (puzzleItemSize.x + puzzlesItemsGap);
    const y = puzzleNumber * (puzzleItemSize.y + puzzlesGap);
    return new Sprite(topLeftAnchor.add(new Vector(x, y)), puzzleItemSize);
  }

  static getSolvedPuzzleSprite(puzzleNumber: number) {
    const x = 0;
    const y = puzzleNumber * (puzzleItemSize.y + puzzlesGap);
    return new Sprite(
      solvedPuzzlesTopLeftAnchor.add(new Vector(x, y)),
      puzzleItemSize
    );
  }

  static isSolved(puzzleCombination: PuzzlesCombination): boolean {
    if (puzzleCombination.puzzlesItems.length !== 4) return false;
    const firstPuzzleItem = puzzleCombination.puzzlesItems[0];
    console.log(
      'vert mirr',
      firstPuzzleItem.vertMirror,
      'horz mirr',
      firstPuzzleItem.horMirror
    );

    if (firstPuzzleItem.horMirror || firstPuzzleItem.vertMirror) return false;
    const canvas =
      puzzleCombination.puzzlesSprites.getPuzzlesCombinationCanvas(
        puzzleCombination
      );
    console.log('comparing');
    for (let i = 0; i < 9; i++) {
      const solvedPuzzleSprite = PuzzlesSprites.getSolvedPuzzleSprite(i);
      const solvedPuzzleCanvas =
        puzzleCombination.puzzlesSprites.getCanvasFromSprite(
          solvedPuzzleSprite
        );
      const comparableSolvedPuzzleCanvas =
        puzzleCombination.puzzlesSprites.getPartOfCanvasToCompare(
          solvedPuzzleCanvas
        );

      const areTheSame = PuzzlesSprites.comparePuzzleCanvases(
        canvas,
        comparableSolvedPuzzleCanvas
      );
      if (areTheSame) return true;
    }
    return false;
  }

  static comparePuzzleCanvases(
    canvas1: HTMLCanvasElement,
    canvas2: HTMLCanvasElement
  ): boolean {
    const canvas1Data = PuzzlesSprites.getCanvasPixelsData(canvas1);
    const canvas2Data = PuzzlesSprites.getCanvasPixelsData(canvas2);
    let areTheSame = true;

    for (var i = 0; i < canvas1Data.length; i += 4) {
      if (canvas1Data[i + 3] !== canvas2Data[i + 3]) areTheSame = false;
    }
    return areTheSame;
  }

  getHorMirrorCanvas(canvas: HTMLCanvasElement) {
    const newCanvas = document.createElement('canvas');
    newCanvas.height = canvas.height;
    newCanvas.width = canvas.width;
    const ctx = newCanvas.getContext('2d');
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(canvas, 0, 0);
    return newCanvas;
  }

  getVertMirrorCanvas(canvas: HTMLCanvasElement) {
    const newCanvas = document.createElement('canvas');
    newCanvas.height = canvas.height;
    newCanvas.width = canvas.width;
    const ctx = newCanvas.getContext('2d');
    ctx.translate(0, canvas.height);
    ctx.scale(1, -1);
    ctx.drawImage(canvas, 0, 0);
    return newCanvas;
  }

  getCanvasFromSprite(sprite: Sprite) {
    const canvas = document.createElement('canvas');
    canvas.width = sprite.dimensions.x;
    canvas.height = sprite.dimensions.y;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(
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
    return canvas;
  }

  getMirroredCanvasFromSprite(
    sprite: Sprite,
    horMirror: boolean,
    vertMirror: boolean
  ) {
    let spriteCanvas = this.getCanvasFromSprite(sprite);
    if (horMirror) {
      spriteCanvas = this.getHorMirrorCanvas(spriteCanvas);
    }
    if (vertMirror) {
      spriteCanvas = this.getVertMirrorCanvas(spriteCanvas);
    }
    return spriteCanvas;
  }

  renderSpriteWithMirror(
    sprite: Sprite,
    position: Vector,
    horMirror: boolean,
    vertMirror: boolean
  ) {
    const spriteCanvas = this.getMirroredCanvasFromSprite(
      sprite,
      horMirror,
      vertMirror
    );
    this.context.drawImage(
      spriteCanvas,
      position.x,
      position.y,
      sprite.dimensions.x * ThemedSprites.SCALE,
      sprite.dimensions.y * ThemedSprites.SCALE
    );
  }

  getPartOfCanvasToCompare(canvas: HTMLCanvasElement): HTMLCanvasElement {
    const partOfCanvas = document.createElement('canvas');
    partOfCanvas.width = 44;
    partOfCanvas.height = 19;
    const xOffset = 2;
    const yOffset = 1;

    const ctx = partOfCanvas.getContext('2d');
    ctx.drawImage(
      canvas,
      xOffset,
      yOffset,
      partOfCanvas.width,
      partOfCanvas.height,
      0,
      0,
      partOfCanvas.width,
      partOfCanvas.height
    );
    return partOfCanvas;
  }

  getComparableCanvas({ color, sprite, horMirror, vertMirror }: PuzzleItem) {
    // console.log(color);
    // const debugCanvas = document.querySelector('.debug-canvas-container');
    const spriteCanvas = this.getMirroredCanvasFromSprite(
      sprite,
      horMirror,
      vertMirror
    );
    const partOfCanvas = this.getPartOfCanvasToCompare(spriteCanvas);
    // debugCanvas.appendChild(spriteCanvas);
    // debugCanvas.appendChild(partOfCanvas);
    return partOfCanvas;
  }

  getPuzzlesCombinationCanvas({ puzzlesItems }: PuzzlesCombination) {
    const canvas = document.createElement('canvas');
    canvas.width = 44;
    canvas.height = 19;

    const ctx = canvas.getContext('2d');
    puzzlesItems.forEach((pi) => {
      const comparablePart = this.getComparableCanvas(pi);
      ctx.drawImage(comparablePart, 0, 0);
    });
    return canvas;
  }
}

export default PuzzlesSprites;
