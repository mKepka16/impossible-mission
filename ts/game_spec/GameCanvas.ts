import Canvas from '../general/Canvas';
import State from '../general/State';
import { getElevators } from '../presets/elevators_presents';
import { getLevels } from '../presets/levels_presets';

class GameCanvas extends Canvas {
  constructor(_canvas: HTMLCanvasElement, _width: number, _height: number) {
    super(_canvas, _width, _height);
  }

  onCanvasInState() {
    State.levels = getLevels();
    State.elevators = getElevators();
    State.currentElevator = State.elevators[1];
    // State.currentLevel = State.levels[28];
    State.scene = 'Elevator';
  }

  update() {
    if (State.scene === 'Elevator' && State.currentElevator !== null) {
      State.currentElevator.update();
      State.currentElevator.render();
    } else if (State.scene === 'Room' && State.currentLevel !== null) {
      State.currentLevel.update();
      State.currentLevel.render();
    }
    this.showFPS('black');
  }
}

export default GameCanvas;
