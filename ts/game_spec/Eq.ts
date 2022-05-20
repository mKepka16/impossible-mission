import PuzzleItem from './MainElevatorView/PuzzleItem';

class Eq {
  snoozes: number = 0;
  liftResets: number = 0;
  puzzles: PuzzleItem[] = [
    new PuzzleItem(0, 0, 'green', true, false),
    new PuzzleItem(0, 1, 'blue', true, true),
    new PuzzleItem(0, 2, 'yellow', false, false),
    new PuzzleItem(0, 3, 'green', true, false),
  ];
}

export default new Eq();
