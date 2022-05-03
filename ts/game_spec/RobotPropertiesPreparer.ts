import Utils from '../general/Utils';
import { actionsQueuePresets } from '../properties_presets/robotPresets';
import { ActionsQueue } from './Robot';

export enum RobotSpecialBehaviour {
  FOLLOW_PLAYER_X = 'FOLLOW_PLAYER_X', // 20%
  ATTACK_WHEN_SEE_PLAYER = 'ATTACK_WHEN_SEE_PLAYER', // 20%
  NONE = 'NONE', // 60%
}

export interface RobotFollowPlayerProperties {
  followSpeed: number;
  followDuration: number;
}

export interface RobotAttackWhenSeePlayerProperties {
  attackDuration: number;
  attacksBreakDuration: number;
}

export interface RobotProperties {
  rotationSpeed: number;
  actionsQueue: ActionsQueue;
  specialBehaviour: RobotSpecialBehaviour;
  followPlayerProps?: RobotFollowPlayerProperties;
  attackWhenSeePlayerProps?: RobotAttackWhenSeePlayerProperties;
}

export class RobotPropertiesPreparer {
  public static getRobotProperties(): RobotProperties {
    const specialBehaviour = this.getSpecialBehaviour();
    return {
      rotationSpeed: this.getRotationSpeed(),
      actionsQueue: this.getActionsQueue(),
      specialBehaviour,
      followPlayerProps:
        specialBehaviour === RobotSpecialBehaviour.FOLLOW_PLAYER_X
          ? this.getFollowPlayerProps()
          : undefined,
      attackWhenSeePlayerProps:
        specialBehaviour === RobotSpecialBehaviour.ATTACK_WHEN_SEE_PLAYER
          ? this.getAttackWhenSeePlayerProps()
          : undefined,
    };
  }

  private static getRotationSpeed(): number {
    const minSpeed = 8;
    const maxSpeed = 30;
    return Math.floor(Math.random() * (maxSpeed - minSpeed)) + minSpeed;
  }

  private static getActionsQueue(): ActionsQueue {
    const index = Utils.getRandInt(0, actionsQueuePresets.length - 1);
    return actionsQueuePresets[index];
  }

  private static getSpecialBehaviour(): RobotSpecialBehaviour {
    const randNum = Utils.getRandInt(1, 5);
    if (randNum === 1) return RobotSpecialBehaviour.ATTACK_WHEN_SEE_PLAYER; // 20%
    if (randNum === 2) return RobotSpecialBehaviour.FOLLOW_PLAYER_X; // 20%
    else return RobotSpecialBehaviour.NONE; // 60%
  }

  private static getFollowPlayerProps(): RobotFollowPlayerProperties {
    return {
      followSpeed: Utils.getRandInt(40, 70),
      followDuration: Utils.getRandInt(1000, 3000),
    };
  }

  private static getAttackWhenSeePlayerProps(): RobotAttackWhenSeePlayerProperties {
    const second = 1000;
    return {
      attackDuration: Utils.getRandInt(500, 1500) / second,
      attacksBreakDuration: Utils.getRandInt(1000, 2500) / second,
    };
  }
}
