import State from '../general/State';
import Utils from '../general/Utils';
import { getHexName, levelsEntries } from '../presets/levels_presets';
import PuzzleItem from './MainElevatorView/PuzzleItem';

interface PuzzleId {
  puzzleNumber: number;
  puzzleItemNumber: number;
}

class Eq {
  snoozes: number = 0;
  liftResets: number = 0;
  puzzles: PuzzleItem[] = [];
  availablePuzzlesIds: PuzzleId[] = [];

  constructor() {
    for (let puzzleNumber = 0; puzzleNumber < 9; puzzleNumber++) {
      for (let puzzleItemNumber = 0; puzzleItemNumber < 4; puzzleItemNumber++) {
        this.availablePuzzlesIds.push({ puzzleItemNumber, puzzleNumber });
      }
    }
  }

  takeOutRandomPuzzle(): PuzzleId {
    const puzzleIndex = Utils.getRandInt(
      0,
      this.availablePuzzlesIds.length - 1
    );
    const puzzleId = this.availablePuzzlesIds[puzzleIndex];
    this.availablePuzzlesIds.splice(puzzleIndex, 1);
    return puzzleId;
  }

  getPuzzle() {
    const color = getHexName(levelsEntries[State.currentLevel.id].color);
    const horMirror = this.getTrueOrFalse();
    const vertMirror = this.getTrueOrFalse();
    const puzzleId = this.takeOutRandomPuzzle();
    const puzzle = new PuzzleItem(
      puzzleId.puzzleNumber,
      puzzleId.puzzleItemNumber,
      color,
      horMirror,
      vertMirror
    );
    this.puzzles.push(puzzle);
    return puzzle;
  }

  getRandomPuzzle() {
    const colorIndex = Utils.getRandInt(1, 3);
    const color =
      colorIndex === 1 ? 'green' : colorIndex === 2 ? 'blue' : 'yellow';
    const horMirror = this.getTrueOrFalse();
    const vertMirror = this.getTrueOrFalse();
    const puzzleId = this.takeOutRandomPuzzle();
    const puzzle = new PuzzleItem(
      puzzleId.puzzleNumber,
      puzzleId.puzzleItemNumber,
      color,
      horMirror,
      vertMirror
    );
    this.puzzles.push(puzzle);
    return puzzle;
  }

  getTrueOrFalse() {
    return Utils.getRandInt(0, 1) === 0;
  }
}

export default new Eq();
