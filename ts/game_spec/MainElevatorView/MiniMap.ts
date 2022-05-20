import { IRenderable } from '../../collisions/IRenderable';
import State from '../../general/State';
import Rooms from '../Rooms';

class MiniMap implements IRenderable {
  xOffset: number;
  yOffset: number;
  animationTime: number = 0;
  animationSpeed: number = 7;
  elevatorsFields: { [key: number]: boolean[] } = {
    1: Array(49).fill(false),
    2: Array(49).fill(false),
    3: Array(49).fill(false),
    4: Array(49).fill(false),
    5: Array(49).fill(false),
    6: Array(49).fill(false),
    7: Array(49).fill(false),
    8: Array(49).fill(false),
  };
  leftTunnels: { [key: number]: boolean[] } = {
    1: Array(12).fill(false),
    2: Array(12).fill(false),
    3: Array(12).fill(false),
    4: Array(12).fill(false),
    5: Array(12).fill(false),
    6: Array(12).fill(false),
    7: Array(12).fill(false),
    8: Array(12).fill(false),
  };
  rightTunnels: { [key: number]: boolean[] } = {
    1: Array(12).fill(false),
    2: Array(12).fill(false),
    3: Array(12).fill(false),
    4: Array(12).fill(false),
    5: Array(12).fill(false),
    6: Array(12).fill(false),
    7: Array(12).fill(false),
    8: Array(12).fill(false),
  };
  rooms: { [key: number]: boolean[] } = {
    1: Array(6).fill(false),
    2: Array(6).fill(false),
    3: Array(6).fill(false),
    4: Array(6).fill(false),
    5: Array(6).fill(false),
    6: Array(6).fill(false),
    7: Array(6).fill(false),
    8: Array(6).fill(false),
    9: Array(6).fill(false),
  };

  animate(dt: number) {
    this.animationTime += dt * this.animationSpeed;
    const frame = Math.floor(this.animationTime) % 5;
    if (frame === 0) return;
    if (frame === 1 || frame === 4) this.renderElevatorRectangle('grey');
    if (frame === 2 || frame === 3) this.renderElevatorRectangle('white');
  }

  renderElevatorRectangle(color: string) {
    const ctx = State.canvas.ctx;
    ctx.fillStyle = color;
    const yPos = State.currentElevator.mainElevator.getMinimapLevel();
    const realYPos = this.yOffset + (1 + yPos) * 3;
    const columnsOffset = 9;
    const x = this.xOffset + columnsOffset + 16 * 3 * State.currentElevator.id;
    ctx.fillRect(x, realYPos, 6, 9);
  }

  revealStop() {
    const stop = State.currentElevator.mainElevator.getLevel(); // 0 - 11
    const elevatorNumber = State.currentElevator.id;
    const yMiddlePxField = 2 + stop * 4;
    for (let i = yMiddlePxField - 2; i <= yMiddlePxField + 2; i++) {
      this.elevatorsFields[elevatorNumber][i] = true;
    }
  }

  revealTunnels() {
    const stop = State.currentElevator.mainElevator.getLevel(); // 0 - 11
    const stopInfo = State.currentElevator.stopsInfo[stop];
    const elevatorNumber = State.currentElevator.id;
    if (stopInfo.left) {
      this.leftTunnels[elevatorNumber][stop] = true;
    }
    if (stopInfo.right) {
      this.rightTunnels[elevatorNumber][stop] = true;
    }
  }

  renderRooms() {
    const ctx = State.canvas.ctx;
    ctx.fillStyle = 'black';

    const fromTheLeft = 8 * 3;
    for (let i = 1; i <= 9; i++) {
      const rooms = this.rooms[i];
      const x = this.xOffset + (fromTheLeft + (i - 1) * 16 * 3);
      rooms.forEach((room, i) => {
        if (room === false) return;
        const y = this.yOffset + (i * 8 + 2) * 3;
        ctx.fillRect(x, y, 24, 15);
      });
    }
  }

  revealRoom(roomId: number) {
    const column = Rooms.findRoomColumn(roomId);
    const place = Rooms.roomsPositions[roomId];
    this.rooms[column][place - 1] = true;
  }

  constructor(xOffset: number, yOffset: number) {
    this.xOffset = xOffset;
    this.yOffset = yOffset;
  }

  update(dt: number) {
    this.revealStop();
    this.revealTunnels();
  }

  render(dt: number) {
    this.renderBackground();
    this.renderElevatorsColumns();
    this.renderLeftTunnels();
    this.renderRightTunnels();
    this.renderRooms();
    this.animate(dt);
  }

  renderBackground() {
    const ctx = State.canvas.ctx;
    ctx.fillStyle = '#1FD21E';
    ctx.fillRect(this.xOffset, this.yOffset, 152 * 3, 49 * 3);
  }

  renderLeftTunnels() {
    const ctx = State.canvas.ctx;
    ctx.fillStyle = 'black';

    for (let i = 1; i <= 8; i++) {
      const leftTunnels = this.leftTunnels[i];
      const x = this.xOffset + 16 * 3 * i;
      leftTunnels.forEach((tunnel, i) => {
        if (tunnel === false) return;
        const y = this.yOffset + (i * 4 + 2) * 3;
        ctx.fillRect(x, y, 9, 3);
      });
    }
  }

  renderRightTunnels() {
    const ctx = State.canvas.ctx;
    ctx.fillStyle = 'black';

    const leftOffset = 15;
    for (let i = 1; i <= 8; i++) {
      const rightTunnels = this.rightTunnels[i];
      const x = this.xOffset + leftOffset + 16 * 3 * i;
      rightTunnels.forEach((tunnel, i) => {
        if (tunnel === false) return;
        const y = this.yOffset + (i * 4 + 2) * 3;
        ctx.fillRect(x, y, 9, 3);
      });
    }
  }

  renderElevatorsColumns() {
    const ctx = State.canvas.ctx;
    ctx.fillStyle = 'black';

    const columnsOffset = 9;
    for (let i = 1; i <= 8; i++) {
      const fields = this.elevatorsFields[i];
      const x = this.xOffset + columnsOffset + 16 * 3 * i;
      fields.forEach((field, i) => {
        if (field === false) return;
        const y = this.yOffset + i * 3;
        ctx.fillRect(x, y, 6, 3);
      });
    }
  }
}

export default new MiniMap(175 + 18, 480 - 88 + 15);
