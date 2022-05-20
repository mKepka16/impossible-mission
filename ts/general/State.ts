import GameCanvas from '../game_spec/GameCanvas';
import Level from '../game_spec/Level';
import ElevatorCorridor from '../game_spec/MainElevatorView/ElevatorCorridor';
import MiniMap from '../game_spec/MainElevatorView/MiniMap';
import Searchable from '../game_spec/Searchable';
import Theme from '../sprites/Theme';
import Assets from './Assets';

type Scene = 'Elevator' | 'Room';

class State {
  public canvas: GameCanvas;
  public theme: Theme = Theme.THEME1;
  private _levels: { [id: number]: Level } = null;
  private _currentLevel: Level = null;
  private _currentElevator: ElevatorCorridor = null;
  public elevators: { [id: number]: ElevatorCorridor } = null;
  public gravity: number = Level.DEFAULT_GRAVITY;
  public friction: number = 0.6;
  public scene: Scene = 'Elevator';
  public allSearchablesNumber: number = 0;
  public searchablesLeftAmount: number = 0;

  public get levels() {
    return this._levels;
  }

  public set levels(value) {
    this._levels = value;
    let allSearchablesNumber = 0;
    for (let key in value) {
      const level = value[key];
      const searchables = level.objects.filter((o) => o instanceof Searchable);
      allSearchablesNumber += searchables.length;
    }
    this.allSearchablesNumber = allSearchablesNumber;
    this.searchablesLeftAmount = allSearchablesNumber;
  }

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
    this._currentLevel = value;
    MiniMap.revealRoom(value.id);
    this.theme = value.theme;
    Assets.reloadTheme();
  }

  startingTime = Date.now();
  getTime() {
    const currentTime = Date.now();
    const timeDiff = currentTime - this.startingTime;
    const secDiff = Math.floor(timeDiff / 1000);
    const hours = Math.floor(secDiff / 3600);
    const mins = Math.floor(secDiff / 60) - hours * 3600;
    const sec = secDiff - hours * 3600 - mins * 60;
    const getWithZero = (time: number) =>
      time.toString().length > 1 ? time.toString() : `0${time}`;
    return `${getWithZero(hours)}:${getWithZero(mins)}:${getWithZero(sec)}`;
  }
}

export default new State();
