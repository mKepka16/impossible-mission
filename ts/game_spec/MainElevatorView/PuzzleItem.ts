import Assets from '../../general/Assets';
import Vector from '../../general/Vector';
import PuzzlesSprites, { PUZZLES_COLORS } from '../../sprites/PuzzlesSprites';

class PuzzleItem {
  puzzleNumber: number;
  number: number;
  color: keyof typeof PUZZLES_COLORS;
  horMirror: boolean = false;
  vertMirror: boolean = false;

  constructor(
    puzzleNumber: number,
    puzzleItemNumber: number,
    color: keyof typeof PUZZLES_COLORS,
    horMirror: boolean,
    vertMirror: boolean
  ) {
    this.puzzleNumber = puzzleNumber;
    this.number = puzzleItemNumber;
    this.color = color;
    this.horMirror = horMirror;
    this.vertMirror = vertMirror;
  }

  get sprite() {
    return PuzzlesSprites.getPuzzleSprite(this.puzzleNumber, this.number);
  }

  render(pos: Vector) {
    switch (this.color) {
      case 'blue':
        Assets.bluePuzzlesSprites.getComparableCanvas(this);
        Assets.bluePuzzlesSprites.renderSpriteWithMirror(
          this.sprite,
          pos,
          this.horMirror,
          this.vertMirror
        );
        break;
      case 'green':
        Assets.greenPuzzlesSprites.getComparableCanvas(this);
        Assets.greenPuzzlesSprites.renderSpriteWithMirror(
          this.sprite,
          pos,
          this.horMirror,
          this.vertMirror
        );
        break;
      case 'yellow':
        Assets.yellowPuzzlesSprites.getComparableCanvas(this);
        Assets.yellowPuzzlesSprites.renderSpriteWithMirror(
          this.sprite,
          pos,
          this.horMirror,
          this.vertMirror
        );
        break;
    }
  }

  copy() {
    return new PuzzleItem(
      this.puzzleNumber,
      this.number,
      this.color,
      this.horMirror,
      this.vertMirror
    );
  }

  isEqual(puzzleItem: PuzzleItem) {
    return (
      puzzleItem.color === this.color &&
      puzzleItem.horMirror === this.horMirror &&
      puzzleItem.vertMirror === this.vertMirror &&
      puzzleItem.number === this.number &&
      puzzleItem.puzzleNumber === this.puzzleNumber
    );
  }
}

export default PuzzleItem;
