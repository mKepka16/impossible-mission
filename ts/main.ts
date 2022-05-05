import Assets from './general/Assets';
import GameCanvas from './game_spec/GameCanvas';
import State from './general/State';
import Rooms from './game_spec/Rooms';

console.log('App is working');

Assets.loadAssets().then(() => {
  Rooms.assignRoomsToColumns();
  Rooms.assignPlaceInTheColumnToRooms();
  const htmlCanvas: HTMLCanvasElement = document.querySelector('#root');
  const canvas = new GameCanvas(htmlCanvas, 960, 600);
  State.canvas = canvas;
  canvas.onCanvasInState();
});
