import Canvas from '../general/Canvas';
import State from '../general/State';
import Level from './Level';
import ElevatorCorridor from './MainElevatorView/ElevatorCorridor';

class GameCanvas extends Canvas {
  elevatorCorridor: ElevatorCorridor = new ElevatorCorridor();

  constructor(_canvas: HTMLCanvasElement, _width: number, _height: number) {
    super(_canvas, _width, _height);
  }

  onCanvasInState() {
    State.levels = [new Level()];
  }

  update() {
    this.renderBackground();
    if (State.levels.length > 0) {
      State.currentLevel = State.levels[0];
      State.currentLevel.update();
      State.currentLevel.render();
    }
    // this.elevatorCorridor.update();
    // this.elevatorCorridor.render();
    this.showFPS('black');
  }

  renderBackground() {
    this.ctx.beginPath();
    this.ctx.fillStyle = State.theme.background;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }
}

export default GameCanvas;
