import ElevatorCorridorSprites from '../../sprites/ElevatorCorridorSprites';

class Tunnel {
  y: number;
  color: string;
  roomId: number;

  constructor(roomId: number, stop: number, color: string) {
    this.roomId = roomId;
    const topOffset = 96;
    const wallHeight =
      ElevatorCorridorSprites.SPRITES.wall.getRealDimensions().y;
    this.y = topOffset + stop * wallHeight * 8;
    this.color = color;
  }
}

export default Tunnel;
