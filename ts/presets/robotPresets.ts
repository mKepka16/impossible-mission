import { ActionsQueue } from '../game_spec/Robot';
export enum RobotActionTypes {
  MOVE,
  ATTACK,
}

const slow = 70;
const normal = 120;
const fast = 200;

export const actionsQueuePresets: ActionsQueue[] = [
  [
    {
      type: RobotActionTypes.MOVE,
      xVelocity: fast,
      destinationXPercentage: 0,
    },
    {
      type: RobotActionTypes.ATTACK,
      attackDuration: 0,
      attackDirection: 'left',
    },
    {
      type: RobotActionTypes.MOVE,
      xVelocity: fast,
      destinationXPercentage: 33,
    },
    {
      type: RobotActionTypes.ATTACK,
      attackDuration: 0,
      attackDirection: 'left',
    },
    {
      type: RobotActionTypes.MOVE,
      xVelocity: fast,
      destinationXPercentage: 66,
    },
    {
      type: RobotActionTypes.ATTACK,
      attackDuration: 0,
      attackDirection: 'left',
    },
    {
      type: RobotActionTypes.MOVE,
      xVelocity: fast,
      destinationXPercentage: 99,
    },
    {
      type: RobotActionTypes.ATTACK,
      attackDuration: 0,
      attackDirection: 'left',
    },
    {
      type: RobotActionTypes.ATTACK,
      attackDuration: 0,
      attackDirection: 'right',
    },
  ],
  [
    {
      type: RobotActionTypes.MOVE,
      xVelocity: fast,
      destinationXPercentage: 0,
    },
    {
      type: RobotActionTypes.ATTACK,
      attackDuration: 0,
      attackDirection: 'left',
    },
    {
      type: RobotActionTypes.MOVE,
      xVelocity: fast,
      destinationXPercentage: 33,
    },
    {
      type: RobotActionTypes.ATTACK,
      attackDuration: 0,
      attackDirection: 'left',
    },
    {
      type: RobotActionTypes.MOVE,
      xVelocity: fast,
      destinationXPercentage: 66,
    },
    {
      type: RobotActionTypes.ATTACK,
      attackDuration: 0,
      attackDirection: 'left',
    },
    {
      type: RobotActionTypes.MOVE,
      xVelocity: fast,
      destinationXPercentage: 99,
    },
    {
      type: RobotActionTypes.ATTACK,
      attackDuration: 0,
      attackDirection: 'left',
    },
    {
      type: RobotActionTypes.ATTACK,
      attackDuration: 0,
      attackDirection: 'right',
    },
    {
      type: RobotActionTypes.MOVE,
      xVelocity: fast,
      destinationXPercentage: 66,
    },
    {
      type: RobotActionTypes.ATTACK,
      attackDuration: 0,
      attackDirection: 'right',
    },
    {
      type: RobotActionTypes.MOVE,
      xVelocity: fast,
      destinationXPercentage: 33,
    },
    {
      type: RobotActionTypes.ATTACK,
      attackDuration: 0,
      attackDirection: 'right',
    },
  ],
  [
    {
      type: RobotActionTypes.MOVE,
      xVelocity: 100,
      destinationXPercentage: 10,
    },
  ],
  [
    {
      type: RobotActionTypes.MOVE,
      xVelocity: 100,
      destinationXPercentage: 50,
    },
  ],
  [
    {
      type: RobotActionTypes.MOVE,
      xVelocity: 100,
      destinationXPercentage: 90,
    },
  ],
  [
    {
      type: RobotActionTypes.MOVE,
      xVelocity: slow,
      destinationXPercentage: 0,
    },
    {
      type: RobotActionTypes.MOVE,
      xVelocity: slow,
      destinationXPercentage: 100,
    },
    {
      type: RobotActionTypes.MOVE,
      xVelocity: slow,
      destinationXPercentage: 0,
    },
  ],
  [
    {
      type: RobotActionTypes.MOVE,
      xVelocity: normal,
      destinationXPercentage: 0,
    },
    {
      type: RobotActionTypes.ATTACK,
      attackDuration: 500,
    },
    {
      type: RobotActionTypes.MOVE,
      xVelocity: normal,
      destinationXPercentage: 20,
    },
    {
      type: RobotActionTypes.ATTACK,
      attackDuration: 500,
    },
    {
      type: RobotActionTypes.MOVE,
      xVelocity: normal,
      destinationXPercentage: 40,
    },
    {
      type: RobotActionTypes.ATTACK,
      attackDuration: 500,
    },
    {
      type: RobotActionTypes.MOVE,
      xVelocity: normal,
      destinationXPercentage: 60,
    },
    {
      type: RobotActionTypes.ATTACK,
      attackDuration: 500,
    },
    {
      type: RobotActionTypes.MOVE,
      xVelocity: normal,
      destinationXPercentage: 80,
    },
    {
      type: RobotActionTypes.ATTACK,
      attackDuration: 500,
    },
    {
      type: RobotActionTypes.MOVE,
      xVelocity: 100,
      destinationXPercentage: 100,
    },
    {
      type: RobotActionTypes.ATTACK,
      attackDuration: 500,
    },
    {
      type: RobotActionTypes.MOVE,
      xVelocity: normal,
      destinationXPercentage: 80,
    },
    {
      type: RobotActionTypes.ATTACK,
      attackDuration: 500,
    },
    {
      type: RobotActionTypes.MOVE,
      xVelocity: normal,
      destinationXPercentage: 60,
    },
    {
      type: RobotActionTypes.ATTACK,
      attackDuration: 500,
    },
    {
      type: RobotActionTypes.MOVE,
      xVelocity: normal,
      destinationXPercentage: 40,
    },
    {
      type: RobotActionTypes.ATTACK,
      attackDuration: 500,
    },
    {
      type: RobotActionTypes.MOVE,
      xVelocity: normal,
      destinationXPercentage: 20,
    },
    {
      type: RobotActionTypes.ATTACK,
      attackDuration: 500,
    },
    {
      type: RobotActionTypes.MOVE,
      xVelocity: normal,
      destinationXPercentage: 0,
    },
    {
      type: RobotActionTypes.ATTACK,
      attackDuration: 500,
    },
  ],
];
