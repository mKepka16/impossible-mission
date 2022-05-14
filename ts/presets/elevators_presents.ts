import ElevatorCorridor from '../game_spec/MainElevatorView/ElevatorCorridor';
import ElevatorTheme from '../game_spec/MainElevatorView/ElevatorTheme';

export const getElevators = (): { [id: number]: ElevatorCorridor } => ({
  1: new ElevatorCorridor(1, new ElevatorTheme([190, 26, 36], [254, 74, 87])),
  2: new ElevatorCorridor(2, new ElevatorTheme([180, 51, 226], [223, 246, 10])),
  3: new ElevatorCorridor(
    3,
    new ElevatorTheme([112, 116, 111], [164, 167, 162])
  ),
  4: new ElevatorCorridor(4, new ElevatorTheme([90, 250, 89], [253, 254, 252])),
  5: new ElevatorCorridor(5, new ElevatorTheme([31, 210, 30], [90, 250, 89])),
  6: new ElevatorCorridor(6, new ElevatorTheme([33, 31, 174], [48, 230, 198])),
  7: new ElevatorCorridor(7, new ElevatorTheme([184, 65, 4], [106, 51, 4])),
  8: new ElevatorCorridor(8, new ElevatorTheme([95, 83, 254], [223, 246, 10])),
});
