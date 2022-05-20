import Assets from '../../general/Assets';
import State from '../../general/State';
import Vector from '../../general/Vector';
import PuzzlesSprites, { PUZZLES_COLORS } from '../../sprites/PuzzlesSprites';
import ThemedSprites from '../../sprites/ThemedSprites';
import Eq from '../Eq';
import PuzzleItem from './PuzzleItem';

class PuzzlesCombination {
  pos: Vector;
  dragAndDropAreaSize: Vector;
  puzzlesItems: PuzzleItem[] = [];
  isSelected: boolean = false;

  get color() {
    return this.isEmpty() ? null : this.puzzlesItems[0].color;
  }

  set color(value: keyof typeof PUZZLES_COLORS) {
    this.puzzlesItems.forEach((p) => (p.color = value));
  }

  constructor(pos: Vector) {
    this.pos = pos;
    this.dragAndDropAreaSize = PuzzlesSprites.getPuzzleSprite(
      0,
      0
    ).getRealDimensions();
  }

  update(dt: number) {}

  render() {
    // this.drawBorders();
    if (this.isSelected) this.renderSelectionRect();
    this.renderBlackBackground();
    this.puzzlesItems.forEach((item) => item.render(this.pos));
  }

  drawBorders(color: string = '#ff0000') {
    const ctx = State.canvas.ctx;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.strokeRect(
      this.pos.x,
      this.pos.y,
      this.dragAndDropAreaSize.x,
      this.dragAndDropAreaSize.y
    );
  }

  renderBlackBackground() {
    const ctx = State.canvas.ctx;
    ctx.beginPath();
    ctx.fillStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.fillRect(
      this.pos.x,
      this.pos.y,
      this.dragAndDropAreaSize.x,
      this.dragAndDropAreaSize.y
    );
  }

  renderSelectionRect() {
    const ctx = State.canvas.ctx;
    ctx.beginPath();
    ctx.fillStyle = '#B84104';
    ctx.lineWidth = 2;
    const offset = new Vector(12, 6);
    ctx.fillRect(
      this.pos.x + offset.x,
      this.pos.y + offset.y,
      this.dragAndDropAreaSize.x,
      this.dragAndDropAreaSize.y
    );
  }

  static from(puzzleItem: PuzzleItem, pos: Vector) {
    const puzzleCombination = new PuzzlesCombination(pos);
    puzzleCombination.puzzlesItems.push(puzzleItem.copy());
    return puzzleCombination;
  }

  horMirror() {
    this.puzzlesItems.forEach((p) => (p.horMirror = !p.horMirror));
  }

  vertMirror() {
    this.puzzlesItems.forEach((p) => (p.vertMirror = !p.vertMirror));
  }

  clear() {
    this.puzzlesItems = [];
    this.isSelected = false;
  }

  doesPixelsOverlap(combination: PuzzlesCombination): boolean {
    const staticCanvas = this.puzzlesSprites.getPuzzlesCombinationCanvas(this);
    const mergedCanvas =
      this.puzzlesSprites.getPuzzlesCombinationCanvas(combination);
    let doesPixelsOverlap = false;

    const staticCanvasPixels = ThemedSprites.getCanvasPixelsData(staticCanvas);
    const mergedCanvasPixels = ThemedSprites.getCanvasPixelsData(mergedCanvas);

    for (var i = 0; i < mergedCanvasPixels.length; i += 4) {
      // i+3 is alpha value
      if (mergedCanvasPixels[i + 3] === 0) continue;
      if (staticCanvasPixels[i + 3] !== 0) doesPixelsOverlap = true;
    }

    return doesPixelsOverlap;
  }

  get puzzlesSprites() {
    switch (this.color) {
      case 'blue':
        return Assets.bluePuzzlesSprites;
      case 'green':
        return Assets.greenPuzzlesSprites;
      case 'yellow':
        return Assets.yellowPuzzlesSprites;
    }
  }

  canMerge(combination: PuzzlesCombination): boolean {
    let canMerge = true;
    if (this.color !== null && this.color !== combination.color)
      canMerge = false;
    if (this.color !== null && this.doesPixelsOverlap(combination))
      canMerge = false;
    return canMerge;
  }

  addCombination(combination: PuzzlesCombination): boolean {
    const canMergePuzzles = this.canMerge(combination);
    if (canMergePuzzles) this.puzzlesItems.push(...combination.puzzlesItems);
    return canMergePuzzles;
  }

  isNotEmpty() {
    return this.puzzlesItems.length > 0;
  }

  isEmpty() {
    return this.puzzlesItems.length === 0;
  }

  copy() {
    const puzzlesCombinationCopy = new PuzzlesCombination(this.pos);
    puzzlesCombinationCopy.puzzlesItems = this.puzzlesItems.map((p) =>
      p.copy()
    );
    return puzzlesCombinationCopy;
  }
}

export default PuzzlesCombination;
