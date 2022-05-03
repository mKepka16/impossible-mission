import GameCanvas from '../game_spec/GameCanvas';
import Level from '../game_spec/Level';
import Theme from '../sprites/Theme';

class State {
  public canvas: GameCanvas;
  public theme: Theme = Theme.THEME1;
  public levels: Level[] = [];
  public currentLevel: Level;
  public gravity: number = Level.DEFAULT_GRAVITY;
  public friction: number = 0.6;
}

export default new State();
