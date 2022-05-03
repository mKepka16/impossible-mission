import Sprite from '../sprites/Sprite';

export interface IAnimated {
  handleAnimation: (dt: number) => void;
  animate: (
    dt: number,
    animationFrames: Sprite[],
    speed: number,
    maxIterationsNumber: number,
    onIterationCycleEnd: () => void
  ) => void;
  animationTime: number;
  currentSprite: Sprite;
  iterationNumber: number;
}
