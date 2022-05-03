import Assets from './general/Assets';
import GameCanvas from './game_spec/GameCanvas';
import State from './general/State';

console.log('App is working');

Assets.loadAssets().then(() => {
  const htmlCanvas: HTMLCanvasElement = document.querySelector('#root');
  const canvas = new GameCanvas(htmlCanvas, 960, 600);
  State.canvas = canvas;
  canvas.onCanvasInState();
});
