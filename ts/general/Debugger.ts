import Eq from '../game_spec/Eq';
import Player from '../game_spec/Player';
import State from './State';

class Debugger {
  showPlayerHitbox = false;
  showEnemiesHitboxes = false;
  showWallsAndPlatformsHitboxes = false;
  showLiftsHitboxes = false;
  showFurnitureHitboxes = false;

  constructor() {
    // hitboxes
    const canvas = document.querySelector('#root');
    const playerCheckbox = document.querySelector(
      '#player'
    ) as HTMLInputElement;
    const enemiesCheckbox = document.querySelector(
      '#enemies'
    ) as HTMLInputElement;
    const wallsAndPlatformsCheckbox = document.querySelector(
      '#walls-and-platforms'
    ) as HTMLInputElement;
    const liftsCheckbox = document.querySelector('#lifts') as HTMLInputElement;
    const furnitureCheckbox = document.querySelector(
      '#furniture'
    ) as HTMLInputElement;

    const allCheckbox = document.querySelector(
      '#all-hitboxes'
    ) as HTMLInputElement;

    playerCheckbox.addEventListener('input', () => {
      this.showPlayerHitbox = playerCheckbox.checked;
      if (!playerCheckbox.checked) allCheckbox.checked = false;
    });

    furnitureCheckbox.addEventListener('input', () => {
      this.showFurnitureHitboxes = furnitureCheckbox.checked;
      if (!furnitureCheckbox.checked) allCheckbox.checked = false;
    });

    enemiesCheckbox.addEventListener('input', () => {
      this.showEnemiesHitboxes = enemiesCheckbox.checked;
      if (!enemiesCheckbox.checked) allCheckbox.checked = false;
    });

    wallsAndPlatformsCheckbox.addEventListener('input', () => {
      this.showWallsAndPlatformsHitboxes = wallsAndPlatformsCheckbox.checked;
      if (!wallsAndPlatformsCheckbox.checked) allCheckbox.checked = false;
    });

    liftsCheckbox.addEventListener('input', () => {
      this.showLiftsHitboxes = liftsCheckbox.checked;
      if (!liftsCheckbox.checked) allCheckbox.checked = false;
    });

    allCheckbox.addEventListener('input', () => {
      console.log('chaning');
      this.showEnemiesHitboxes = allCheckbox.checked;
      this.showLiftsHitboxes = allCheckbox.checked;
      this.showPlayerHitbox = allCheckbox.checked;
      this.showFurnitureHitboxes = allCheckbox.checked;
      this.showWallsAndPlatformsHitboxes = allCheckbox.checked;
      playerCheckbox.checked = allCheckbox.checked;
      enemiesCheckbox.checked = allCheckbox.checked;
      wallsAndPlatformsCheckbox.checked = allCheckbox.checked;
      liftsCheckbox.checked = allCheckbox.checked;
      furnitureCheckbox.checked = allCheckbox.checked;
    });

    const killPlayerBtn = document.querySelector(
      '#kill-player-button'
    ) as HTMLButtonElement;
    killPlayerBtn.addEventListener('click', () => {
      if (State.scene === 'Room') Player.kill();
      killPlayerBtn.blur();
    });

    const giveRandomPuzzleBtn = document.querySelector(
      '#random-puzzle'
    ) as HTMLButtonElement;
    giveRandomPuzzleBtn.onclick = () => {
      Eq.getRandomPuzzle();
      giveRandomPuzzleBtn.blur();
    };

    const giveSnoozeBtn = document.querySelector(
      '#snooze'
    ) as HTMLButtonElement;
    giveSnoozeBtn.onclick = () => {
      Eq.snoozes++;
      giveSnoozeBtn.blur();
    };

    const giveLiftResetBtn = document.querySelector(
      '#lift-reset'
    ) as HTMLButtonElement;
    giveLiftResetBtn.onclick = () => {
      Eq.liftResets++;
      giveLiftResetBtn.blur();
    };
  }
}

export default new Debugger();
