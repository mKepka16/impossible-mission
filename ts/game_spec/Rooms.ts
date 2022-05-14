import Utils from '../general/Utils';

class Rooms {
  roomsColumns: { [key: number]: number[] } = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
  };

  roomsPositions: { [room: number]: number } = {};

  findRoomColumn(roomId: number) {
    for (let i = 1; i <= 9; i++) {
      if (this.roomsColumns[i].some((room) => room === roomId)) return i;
    }
    return null;
  }

  assignRoomsToColumns() {
    const withBothEntries: number[] = [
      0, 1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    ];
    const withLeftEntry: number[] = [16, 18, 19, 20, 21, 22, 23];
    const withRightEntry: number[] = [24, 25, 26, 28, 29, 30, 31];
    const MAX_ROOMS_IN_COLUMN: number = 6;

    // Assigning two rooms with two entries to columns 2-8
    for (let i = 2; i <= 8; i++) {
      let roomIndex = Utils.getRandInt(0, withBothEntries.length - 1);
      let roomId = withBothEntries.splice(roomIndex, 1)[0];
      this.roomsColumns[i].push(roomId);
      roomIndex = Utils.getRandInt(0, withBothEntries.length - 1);
      roomId = withBothEntries.splice(roomIndex, 1)[0];
      this.roomsColumns[i].push(roomId);
    }

    // Assigning last two entry room to column 2-8
    const column = Utils.getRandInt(2, 8);
    this.roomsColumns[column].push(withBothEntries.pop());

    // Assigning two or three rooms with right entry to column 1
    {
      const roomsToAdd = Utils.getRandInt(2, 3);
      for (let i = 1; i <= roomsToAdd; i++) {
        let roomIndex = Utils.getRandInt(0, withRightEntry.length - 1);
        let roomId = withRightEntry.splice(roomIndex, 1)[0];
        this.roomsColumns[1].push(roomId);
      }
    }

    // Assigning two or three rooms with left entry to column 9
    {
      const roomsToAdd = Utils.getRandInt(2, 3);
      for (let i = 1; i <= roomsToAdd; i++) {
        let roomIndex = Utils.getRandInt(0, withLeftEntry.length - 1);
        let roomId = withLeftEntry.splice(roomIndex, 1)[0];
        this.roomsColumns[9].push(roomId);
      }
    }

    // Assigning ramainging rooms to random columns 2-8
    {
      const ramainingRooms = [...withLeftEntry, ...withRightEntry];
      while (ramainingRooms.length > 0) {
        const columnNumber = Utils.getRandInt(2, 8);
        if (this.roomsColumns[columnNumber].length === MAX_ROOMS_IN_COLUMN)
          continue;
        const roomIndex = Utils.getRandInt(0, ramainingRooms.length - 1);
        const roomId = ramainingRooms.splice(roomIndex, 1)[0];
        this.roomsColumns[columnNumber].push(roomId);
      }
    }
  }

  assignPlaceInTheColumnToRooms() {
    for (let i = 1; i <= 9; i++) {
      const rooms = [...this.roomsColumns[i]];
      const takenPlaces: number[] = [];
      rooms.forEach((room) => {
        const place = Utils.getRandInt(1, 6, takenPlaces);
        takenPlaces.push(place);
        this.roomsPositions[room] = place;
      });
    }
  }
}

export default new Rooms();
