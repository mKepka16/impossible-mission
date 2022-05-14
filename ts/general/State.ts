import GameCanvas from '../game_spec/GameCanvas';
import Level from '../game_spec/Level';
import ElevatorCorridor from '../game_spec/MainElevatorView/ElevatorCorridor';
import MiniMap from '../game_spec/MainElevatorView/MiniMap';
import Theme from '../sprites/Theme';
import Assets from './Assets';

type Scene = 'Elevator' | 'Room';

class State {
  public canvas: GameCanvas;
  public theme: Theme = Theme.THEME1;
  public levels: { [id: number]: Level } = null;
  private _currentLevel: Level = null;
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

  public get currentLevel() {
    return this._currentLevel;
  }

  public set currentLevel(value) {
    console.log('setting level', value.id);
    this._currentLevel = value;
    MiniMap.revealRoom(value.id);
  }
}

export default new State();
