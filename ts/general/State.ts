import GameCanvas from '../game_spec/GameCanvas';
import Level from '../game_spec/Level';
import ElevatorCorridor from '../game_spec/MainElevatorView/ElevatorCorridor';
import Theme from '../sprites/Theme';
import Assets from './Assets';

type Scene = 'Elevator' | 'Room';

class State {
  public canvas: GameCanvas;
  public theme: Theme = Theme.THEME1;
  public levels: { [id: number]: Level } = null;
  public currentLevel: Level = null;
  private _currentElevator: ElevatorCorridor = null;
  public elevators: { [id: number]: ElevatorCorridor } = null;
  public gravity: number = Level.DEFAULT_GRAVITY;
  public friction: number = 0.6;
  public scene: Scene = 'Elevator';

  public get currentElevator() {
    return this._currentElevator;
  }

  public set currentElevator(value) {
    this._currentElevator = value;
    Assets.elevatorCorridorSprites.setNewTheme(value.theme);
  }
}

export default new State();
