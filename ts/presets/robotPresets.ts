import { ActionsQueue } from '../game_spec/Robot';
export enum RobotActionTypes {
  MOVE,
  ATTACK,
}

export const actionsQueuePresets: ActionsQueue[] = [
  [
    {
      type: RobotActionTypes.MOVE,
      xVelocity: 100,
      destinationXPercentage: 10,
    },
    {
      type: RobotActionTypes.ATTACK,
      attackDuration: 1000,
    },
    {
      type: RobotActionTypes.MOVE,
      xVelocity: 120,
      destinationXPercentage: 50,
    },
    {
      type: RobotActionTypes.ATTACK,
      attackDuration: 3000,
    },
    {
      type: RobotActionTypes.MOVE,
      xVelocity: 200,
      destinationXPercentage: 100,
    },
    {
      type: RobotActionTypes.MOVE,
      xVelocity: 100,
      destinationXPercentage: 50,
    },
    {
      type: RobotActionTypes.MOVE,
      xVelocity: 100,
      destinationXPercentage: 100,
    },
    {
      type: RobotActionTypes.ATTACK,
      attackDuration: 1500,
      attackDirection: 'left',
    },
    {
      type: RobotActionTypes.MOVE,
      xVelocity: 100,
      destinationXPercentage: 0,
    },
  ],
];
