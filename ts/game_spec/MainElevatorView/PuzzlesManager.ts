import { NoCollisionBox } from '../../collisions/NoCollisionBox';
import Vector from '../../general/Vector';
import PuzzlesSprites, { PUZZLES_COLORS } from '../../sprites/PuzzlesSprites';
import Controls from '../Controls';
import Eq from '../Eq';
import PocketComputer from './PocketComputer';
import PuzzlesCombination from './PuzzlesCombination';

const topPuzzleItemPosition = new Vector(168, 384);
const bottomPuzzleItemPosition = new Vector(168, 456);
const puzzleItemDim = PuzzlesSprites.getPuzzleSprite(0, 0).getRealDimensions();

class PuzzlesManager {
  isKeyDown: boolean = false;
  topPuzzleItemIndex: number = 0;
  private _draggedPuzzleCombination: PuzzlesCombination = null;

  get draggedPuzzleCombination() {
    return this._draggedPuzzleCombination;
  }

  set draggedPuzzleCombination(value) {
    PocketComputer.isDragging = value !== null;
    this._draggedPuzzleCombination = value;
  }

  puzzlesCombinations: PuzzlesCombination[] = [
    new PuzzlesCombination(new Vector(357, 384)),
    new PuzzlesCombination(new Vector(528, 384)),
    new PuzzlesCombination(new Vector(357, 456)),
    new PuzzlesCombination(new Vector(528, 456)),
  ];

  unselectAllPuzzleCombinations() {
    this.puzzlesCombinations.forEach((p) => (p.isSelected = false));
  }

  getSelectedPuzzleCombination(cursorPos: Vector) {
    const puzzle = this.puzzlesCombinations.find((pc) => {
      const isPointing = this.isCursorPointing(
        cursorPos,
        new NoCollisionBox(pc.pos, pc.dragAndDropAreaSize)
      );
      const isHoldingSpace = Controls.cursor.space;
      return isPointing && isHoldingSpace;
    });
    if (puzzle) this.isKeyDown = true;
    return puzzle;
  }

  selectPuzzleCombination(puzzleCombination: PuzzlesCombination) {
    this.puzzlesCombinations.forEach((p) => (p.isSelected = false));
    puzzleCombination.isSelected = true;
  }

  handlePuzzlesMerge(cursorPos: Vector) {
    if (this.isKeyDown) return;
    const puzzle = this.getSelectedPuzzleCombination(cursorPos);
    if (puzzle === undefined) return;

    //taking puzzle
    if (this.draggedPuzzleCombination === null && puzzle.isNotEmpty()) {
      if (puzzle.isSelected) {
        this.draggedPuzzleCombination = puzzle.copy();
      } else {
        this.selectPuzzleCombination(puzzle);
      }
      return;
    }
    if (this.draggedPuzzleCombination === null) return;
    if (puzzle.isSelected) {
      this.draggedPuzzleCombination = null;
      return;
    }
    const hasMerged = puzzle.addCombination(this.draggedPuzzleCombination);
    if (!hasMerged) {
      console.log('cannot merge those puzzles');
      return;
    }
    this.selectPuzzleCombination(puzzle);
    this.draggedPuzzleCombination = null;
    this.handlePuzzlesMerged();
  }

  deletePuzzleItemsFromEq(puzzleNumber: number) {
    Eq.puzzles = Eq.puzzles.filter((p) => p.puzzleNumber !== puzzleNumber);
    this.topPuzzleItemIndex = 0;
  }

  deletePuzzleCombination(puzzleNumber: number) {
    this.puzzlesCombinations.forEach((pc) => {
      if (pc.puzzlesItems.find((item) => item.puzzleNumber === puzzleNumber)) {
        pc.clear();
      }
    });
  }

  handlePuzzlesMerged() {
    const selectedPuzzleCombination = this.getSelectedPuzzlesCombination();
    const isSolved = PuzzlesSprites.isSolved(selectedPuzzleCombination);
    if (isSolved) {
      const puzzleNumber =
        selectedPuzzleCombination.puzzlesItems[0].puzzleNumber;
      PocketComputer.revealLetter(puzzleNumber);
      this.deletePuzzleItemsFromEq(puzzleNumber);
      this.deletePuzzleCombination(puzzleNumber);
      selectedPuzzleCombination.clear();
      this.unselectAllPuzzleCombinations();
    }
  }

  getSelectedPuzzlesCombination() {
    return this.puzzlesCombinations.find((p) => p.isSelected);
  }

  getLastNotEmptyCombination() {
    for (let i = 3; i >= 0; i--) {
      const currentCombination = this.puzzlesCombinations[i];
      if (currentCombination.isNotEmpty()) {
        return currentCombination;
      }
    }
    return null;
  }

  deleteSelectedPuzzle() {
    const puzzle = this.getSelectedPuzzlesCombination();
    if (puzzle) {
      puzzle.clear();
      const combinationToSelect = this.getLastNotEmptyCombination();
      if (combinationToSelect !== null)
        this.selectPuzzleCombination(combinationToSelect);
    }
  }

  update(dt: number, cursorPos: Vector) {
    this.puzzlesCombinations.forEach((p) => p.update(dt));
    if (
      this.isCollidingWithPuzzle(cursorPos, topPuzzleItemPosition) &&
      this.getTopPuzzleItem() !== undefined
    ) {
      console.log('space over top puzzle item');
      if (
        this.draggedPuzzleCombination !== null &&
        this.draggedPuzzleCombination.puzzlesItems.length === 1 &&
        this.draggedPuzzleCombination.puzzlesItems[0].isEqual(
          this.getTopPuzzleItem()
        )
      ) {
        this.draggedPuzzleCombination = null;
      } else {
        this.draggedPuzzleCombination = PuzzlesCombination.from(
          this.getTopPuzzleItem(),
          cursorPos
        );
        this.unselectAllPuzzleCombinations();
      }
    }
    if (
      this.isCollidingWithPuzzle(cursorPos, bottomPuzzleItemPosition) &&
      this.getBottomPuzzleItem() !== undefined
    ) {
      if (
        this.draggedPuzzleCombination !== null &&
        this.draggedPuzzleCombination.puzzlesItems.length === 1 &&
        this.draggedPuzzleCombination.puzzlesItems[0].isEqual(
          this.getBottomPuzzleItem()
        )
      ) {
        this.draggedPuzzleCombination = null;
      } else {
        console.log('space over bottom puzzle item');
        this.draggedPuzzleCombination = PuzzlesCombination.from(
          this.getBottomPuzzleItem(),
          cursorPos
        );
        this.unselectAllPuzzleCombinations();
      }
    }
    this.handleSpaceUp();
    this.updateDraggedPuzzle(cursorPos);
    this.handlePuzzlesMerge(cursorPos);
  }

  updateDraggedPuzzle(cursorPos: Vector) {
    if (this.draggedPuzzleCombination !== null) {
      this.draggedPuzzleCombination.pos = cursorPos;
    }
  }

  renderDraggedPuzzle() {
    if (this.draggedPuzzleCombination !== null) {
      this.draggedPuzzleCombination.render();
    }
  }

  isCollidingWithPuzzle(cursorPos: Vector, puzzlePos: Vector) {
    const isColliding =
      this.isCursorPointing(
        cursorPos,
        new NoCollisionBox(puzzlePos, puzzleItemDim)
      ) &&
      Controls.cursor.space &&
      this.isKeyDown === false;
    // console.log('is colliding', isColliding);
    if (isColliding) this.isKeyDown = true;
    return isColliding;
  }

  getTopPuzzleItem() {
    return Eq.puzzles[this.topPuzzleItemIndex];
  }

  getBottomPuzzleItem() {
    return Eq.puzzles[this.topPuzzleItemIndex + 1];
  }

  handleSpaceUp() {
    if (this.isKeyDown === true && Controls.cursor.space === false) {
      this.isKeyDown = false;
    }
  }

  isCursorPointing(cursorPos: Vector, rect: NoCollisionBox) {
    return (
      cursorPos.x > rect.pos.x &&
      cursorPos.x < rect.pos.x + rect.dim.x &&
      cursorPos.y > rect.pos.y &&
      cursorPos.y < rect.pos.y + rect.dim.y
    );
  }

  render() {
    this.renderLeftPuzzlesItems();
    this.puzzlesCombinations.forEach((p) => p.render());
    this.renderDraggedPuzzle();
  }

  renderLeftPuzzlesItems() {
    const topPuzzleItem = Eq.puzzles[this.topPuzzleItemIndex];
    const bottomPuzzleItem = Eq.puzzles[this.topPuzzleItemIndex + 1];

    if (topPuzzleItem) topPuzzleItem.render(topPuzzleItemPosition);
    if (bottomPuzzleItem) bottomPuzzleItem.render(bottomPuzzleItemPosition);
  }

  nextPuzzleItem() {
    if (this.topPuzzleItemIndex < Eq.puzzles.length - 2)
      this.topPuzzleItemIndex++;
  }

  previousPuzzleItem() {
    if (this.topPuzzleItemIndex > 0) this.topPuzzleItemIndex--;
  }

  setSelectedPuzzleColor(color: keyof typeof PUZZLES_COLORS) {
    const puzzle = this.getSelectedPuzzlesCombination();
    if (puzzle) {
      puzzle.color = color;
    }
  }

  horMirrorSelectedPuzzle() {
    const puzzle = this.getSelectedPuzzlesCombination();
    if (puzzle) {
      puzzle.horMirror();
      this.handlePuzzlesMerged();
    }
  }

  vertMirrorSelectedPuzzle() {
    const puzzle = this.getSelectedPuzzlesCombination();
    if (puzzle) {
      puzzle.vertMirror();
      this.handlePuzzlesMerged();
    }
  }
}

export default new PuzzlesManager();
