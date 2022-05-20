import Ball from '../game_spec/Ball';
import Elevator from '../game_spec/Elevator';
import { ElevatorSpot } from '../game_spec/ElevatorSpot';
import Level from '../game_spec/Level';
import Platform from '../game_spec/Platform';
import { Robot } from '../game_spec/Robot';
import Searchable from '../game_spec/Searchable';
import Terminal from '../game_spec/Terminal';
import Wall from '../game_spec/Wall';
import Theme from '../sprites/Theme';
import { Pixel } from '../sprites/ThemedSprites';

export const getLevels = (): { [id: number]: Level } => ({
  // 0: new Level(0, [
  //   new Wall(0, 0, 1, 'right'),
  //   new Wall(0, 7, 12, 'right'),
  //   new Wall(39, 0, 1, 'left'),
  //   new Wall(39, 7, 12, 'left'),
  //   new Platform(0, 6, 20),
  //   new Platform(0, 24, 20),
  //   new Terminal(24, 24),
  // ]),
  1: new Level(
    1,
    [
      new Wall(0, 0, 1, 'right'),
      new Wall(0, 7, 18, 'right'),
      new Wall(39, 0, 1, 'left'),
      new Wall(39, 7, 18, 'left'),
      //floor
      new Platform(1, 24, 1),
      new Platform(6, 24, 0.5),
      new Platform(10, 24, 0.5),
      new Platform(14, 24, 5.5),
      new Platform(29, 24, 5),
      //0.5
      new Platform(25, 21, 2),
      // 1
      new Platform(14, 18, 5.5),
      new Platform(29, 18, 3.5),
      // 2
      new Platform(14, 12, 11),
      // 3
      new Platform(0, 6, 1.5),
      new Platform(6, 6, 0.5),
      new Platform(10, 6, 0.5),
      new Platform(14, 6, 13.5),
      //elevators
      new Elevator(3, 24, 1),
      new Elevator(7, 24, 2),
      new Elevator(11, 24, 3),
      new ElevatorSpot(3, 18, 1),
      new ElevatorSpot(7, 18, 2),
      new ElevatorSpot(11, 18, 3),
      new ElevatorSpot(3, 12, 1),
      new ElevatorSpot(7, 12, 2),
      new ElevatorSpot(11, 12, 3),
      new ElevatorSpot(3, 6, 1),
      new ElevatorSpot(7, 6, 2),
      new ElevatorSpot(11, 6, 3),

      new Elevator(36, 18, 4),
      new ElevatorSpot(36, 12, 4),
      // computers
      new Terminal(14, 6),
      new Terminal(31, 24),
      // searchables
      new Searchable('wideControlPanel', 19, 12),
      new Searchable('deskWithComputer', 25, 12),
      new Searchable('scanner', 16, 18),
      new Searchable('controlPanel', 30, 18),
      new Searchable('controlPanel', 33, 18),
      //robots
      new Robot({ fromX: 14, toX: 36, y: 12 }),
      new Robot({ fromX: 14, toX: 25, y: 18 }),
      new Robot({ fromX: 14, toX: 25, y: 24 }),
    ],
    Theme.THEME1
  ),
  2: new Level(
    2,
    [
      new Wall(0, 0, 19, 'right'),
      new Wall(39, 0, 19, 'left'),

      // platforms
      new Platform(0, 24, 0.5),
      new Platform(4, 24, 11),
      new Platform(29, 24, 5.5),
      // 1
      new Platform(4, 18, 5),
      new Platform(17, 15, 4.5),
      new Platform(29, 18, 5),
      // 2
      new Platform(29, 12, 5),
      new Platform(8, 9, 9),
      // 3
      new Platform(1, 6, 2),
      new Platform(29, 6, 5),
      // elevators
      new Elevator(1, 24, 1),
      new ElevatorSpot(1, 18, 1),

      new Elevator(14, 18, 2),
      new ElevatorSpot(14, 15, 2),

      new Elevator(26, 15, 3),
      new ElevatorSpot(26, 24, 3),
      new ElevatorSpot(26, 9, 3),

      // computers
      new Terminal(5, 24),

      //searchables
      new Searchable('scanner', 2, 6),
      new Searchable('vendingMachine', 30, 6),
      new Searchable('wideControlPanel', 15, 9),
      //robots
      new Robot({ fromX: 4, toX: 14, y: 18 }),
      new Robot({ fromX: 17, toX: 26, y: 15 }),
      new Robot({ fromX: 29, toX: 39, y: 12 }),
      new Robot({ fromX: 8, toX: 26, y: 9 }),
    ],
    Theme.THEME2
  ),
  3: new Level(
    3,
    [
      new Wall(0, 0, 1, 'right'),
      new Wall(0, 7, 18, 'right'),
      new Wall(39, 0, 1, 'left'),
      new Wall(39, 7, 18, 'left'),
      //floor
      new Platform(1, 24, 1),
      new Platform(6, 24, 0.5),
      new Platform(10, 24, 0.5),
      new Platform(14, 24, 5.5),
      new Platform(29, 24, 5),
      //0.5
      new Platform(25, 21, 2),
      // 1
      new Platform(14, 18, 5.5),
      new Platform(29, 18, 3.5),
      // 2
      new Platform(14, 12, 11),
      // 3
      new Platform(0, 6, 1.5),
      new Platform(6, 6, 0.5),
      new Platform(10, 6, 0.5),
      new Platform(14, 6, 13.5),
      //elevators
      new Elevator(3, 24, 1),
      new Elevator(7, 24, 2),
      new Elevator(11, 24, 3),
      new ElevatorSpot(3, 18, 1),
      new ElevatorSpot(7, 18, 2),
      new ElevatorSpot(11, 18, 3),
      new ElevatorSpot(3, 12, 1),
      new ElevatorSpot(7, 12, 2),
      new ElevatorSpot(11, 12, 3),
      new ElevatorSpot(3, 6, 1),
      new ElevatorSpot(7, 6, 2),
      new ElevatorSpot(11, 6, 3),

      new Elevator(36, 18, 4),
      new ElevatorSpot(36, 12, 4),
      // computers
      new Terminal(14, 6),
      new Terminal(31, 24),
      // searchables
      new Searchable('wideControlPanel', 19, 12),
      new Searchable('deskWithComputer', 25, 12),
      new Searchable('scanner', 16, 18),
      new Searchable('controlPanel', 30, 18),
      new Searchable('controlPanel', 33, 18),
      //robots
      new Robot({ fromX: 14, toX: 36, y: 12 }),
      new Robot({ fromX: 14, toX: 25, y: 18 }),
      new Robot({ fromX: 14, toX: 25, y: 24 }),
    ],
    Theme.THEME1
  ),
  4: new Level(
    4,
    [
      new Wall(0, 0, 19, 'right'),
      new Wall(39, 0, 19, 'left'),

      // platforms
      new Platform(0, 24, 0.5),
      new Platform(4, 24, 11),
      new Platform(29, 24, 5.5),
      // 1
      new Platform(4, 18, 5),
      new Platform(17, 15, 4.5),
      new Platform(29, 18, 5),
      // 2
      new Platform(29, 12, 5),
      new Platform(8, 9, 9),
      // 3
      new Platform(1, 6, 2),
      new Platform(29, 6, 5),
      // elevators
      new Elevator(1, 24, 1),
      new ElevatorSpot(1, 18, 1),

      new Elevator(14, 18, 2),
      new ElevatorSpot(14, 15, 2),

      new Elevator(26, 15, 3),
      new ElevatorSpot(26, 24, 3),
      new ElevatorSpot(26, 9, 3),

      // computers
      new Terminal(5, 24),

      //searchables
      new Searchable('scanner', 2, 6),
      new Searchable('vendingMachine', 30, 6),
      new Searchable('wideControlPanel', 15, 9),
      //robots
      new Robot({ fromX: 4, toX: 14, y: 18 }),
      new Robot({ fromX: 17, toX: 26, y: 15 }),
      new Robot({ fromX: 29, toX: 39, y: 12 }),
      new Robot({ fromX: 8, toX: 26, y: 9 }),
    ],
    Theme.THEME2
  ),
  6: new Level(
    6,
    [
      new Wall(0, 0, 19, 'right'),
      new Wall(39, 0, 19, 'left'),

      // platforms
      new Platform(0, 24, 0.5),
      new Platform(4, 24, 11),
      new Platform(29, 24, 5.5),
      // 1
      new Platform(4, 18, 5),
      new Platform(17, 15, 4.5),
      new Platform(29, 18, 5),
      // 2
      new Platform(29, 12, 5),
      new Platform(8, 9, 9),
      // 3
      new Platform(1, 6, 2),
      new Platform(29, 6, 5),
      // elevators
      new Elevator(1, 24, 1),
      new ElevatorSpot(1, 18, 1),

      new Elevator(14, 18, 2),
      new ElevatorSpot(14, 15, 2),

      new Elevator(26, 15, 3),
      new ElevatorSpot(26, 24, 3),
      new ElevatorSpot(26, 9, 3),

      // computers
      new Terminal(5, 24),

      //searchables
      new Searchable('scanner', 2, 6),
      new Searchable('vendingMachine', 30, 6),
      new Searchable('wideControlPanel', 15, 9),
      //robots
      new Robot({ fromX: 4, toX: 14, y: 18 }),
      new Robot({ fromX: 17, toX: 26, y: 15 }),
      new Robot({ fromX: 29, toX: 39, y: 12 }),
      new Robot({ fromX: 8, toX: 26, y: 9 }),
    ],
    Theme.THEME2
  ),
  7: new Level(
    7,
    [
      new Wall(0, 0, 1, 'right'),
      new Wall(0, 7, 18, 'right'),
      new Wall(39, 0, 1, 'left'),
      new Wall(39, 7, 18, 'left'),
      //floor
      new Platform(1, 24, 1),
      new Platform(6, 24, 0.5),
      new Platform(10, 24, 0.5),
      new Platform(14, 24, 5.5),
      new Platform(29, 24, 5),
      //0.5
      new Platform(25, 21, 2),
      // 1
      new Platform(14, 18, 5.5),
      new Platform(29, 18, 3.5),
      // 2
      new Platform(14, 12, 11),
      // 3
      new Platform(0, 6, 1.5),
      new Platform(6, 6, 0.5),
      new Platform(10, 6, 0.5),
      new Platform(14, 6, 13.5),
      //elevators
      new Elevator(3, 24, 1),
      new Elevator(7, 24, 2),
      new Elevator(11, 24, 3),
      new ElevatorSpot(3, 18, 1),
      new ElevatorSpot(7, 18, 2),
      new ElevatorSpot(11, 18, 3),
      new ElevatorSpot(3, 12, 1),
      new ElevatorSpot(7, 12, 2),
      new ElevatorSpot(11, 12, 3),
      new ElevatorSpot(3, 6, 1),
      new ElevatorSpot(7, 6, 2),
      new ElevatorSpot(11, 6, 3),

      new Elevator(36, 18, 4),
      new ElevatorSpot(36, 12, 4),
      // computers
      new Terminal(14, 6),
      new Terminal(31, 24),
      // searchables
      new Searchable('wideControlPanel', 19, 12),
      new Searchable('deskWithComputer', 25, 12),
      new Searchable('scanner', 16, 18),
      new Searchable('controlPanel', 30, 18),
      new Searchable('controlPanel', 33, 18),
      //robots
      new Robot({ fromX: 14, toX: 36, y: 12 }),
      new Robot({ fromX: 14, toX: 25, y: 18 }),
      new Robot({ fromX: 14, toX: 25, y: 24 }),
    ],
    Theme.THEME1
  ),
  8: new Level(
    8,
    [
      new Wall(0, 0, 1, 'right'),
      new Wall(0, 7, 18, 'right'),
      new Wall(39, 0, 19, 'left'),
      new Platform(4, 24, 16),
      new Platform(4, 18, 16),
      new Platform(4, 12, 16),
      new Platform(4, 6, 16),
      new Platform(0, 6, 0.5),
      new Platform(39, 24, 1),

      new Elevator(1, 6, 1),
      new Elevator(1, 12, 1),
      new ElevatorSpot(1, 18, 1),
      new ElevatorSpot(1, 24, 1),

      new ElevatorSpot(36, 6, 2),
      new Elevator(36, 12, 2),
      new Elevator(36, 18, 2),
      new Elevator(36, 24, 2),

      new Terminal(5, 6),
      new Terminal(32, 24),

      new Searchable('bookshelf', 26, 12),
      new Searchable('bookshelf', 17, 18),
      new Searchable('couchWithLamp', 22, 18),
      new Searchable('bookshelf', 11, 24),

      new Robot({ fromX: 10, toX: 36, y: 6 }),
      new Robot({ fromX: 4, toX: 36, y: 12 }),
      new Robot({ fromX: 4, toX: 36, y: 18 }),
      new Robot({ fromX: 4, toX: 30, y: 24 }),
    ],
    Theme.THEME8
  ),
  9: new Level(
    9,
    [
      new Wall(39, 0, 1, 'left'),
      new Wall(39, 7, 18, 'left'),
      new Wall(0, 0, 19, 'right'),
      new Platform(0, 24, 9),
      new Platform(21, 24, 9),

      new Platform(4, 18, 7),
      new Platform(21, 18, 7.5),

      new Platform(4, 12, 3),
      new Platform(13, 12, 7),
      new Platform(30, 12, 3),

      new Platform(1, 6, 4.5),
      new Platform(13, 6, 7),
      new Platform(30, 6, 5.5),

      new Elevator(1, 18, 1),
      new ElevatorSpot(1, 12, 1),

      new Elevator(18, 24, 2),
      new ElevatorSpot(18, 18, 2),

      new Elevator(36, 18, 3),
      new ElevatorSpot(36, 12, 3),

      new Elevator(10, 12, 4),
      new ElevatorSpot(10, 6, 4),

      new Elevator(27, 12, 5),
      new ElevatorSpot(27, 6, 5),

      new Terminal(7, 24),
      new Terminal(33, 6),

      new Searchable('deskWithLamp', 14, 12),
      new Searchable('candyMachine', 22, 12),

      new Robot({ fromX: 21, toX: 39, y: 24 }),
      new Robot({ fromX: 21, toX: 36, y: 18 }),
      new Robot({ fromX: 13, toX: 27, y: 12 }),
      new Robot({ fromX: 13, toX: 27, y: 6 }),
    ],
    Theme.THEME9
  ),
  10: new Level(
    10,
    [
      new Wall(0, 0, 1, 'right'),
      new Wall(0, 7, 18, 'right'),
      new Wall(39, 0, 19, 'left'),
      new Platform(4, 24, 16),
      new Platform(4, 18, 16),
      new Platform(4, 12, 16),
      new Platform(4, 6, 16),
      new Platform(0, 6, 0.5),
      new Platform(39, 24, 1),

      new Elevator(1, 6, 1),
      new Elevator(1, 12, 1),
      new ElevatorSpot(1, 18, 1),
      new ElevatorSpot(1, 24, 1),

      new ElevatorSpot(36, 6, 2),
      new Elevator(36, 12, 2),
      new Elevator(36, 18, 2),
      new Elevator(36, 24, 2),

      new Terminal(5, 6),
      new Terminal(32, 24),

      new Searchable('bookshelf', 26, 12),
      new Searchable('bookshelf', 17, 18),
      new Searchable('couchWithLamp', 22, 18),
      new Searchable('bookshelf', 11, 24),

      new Robot({ fromX: 10, toX: 36, y: 6 }),
      new Robot({ fromX: 4, toX: 36, y: 12 }),
      new Robot({ fromX: 4, toX: 36, y: 18 }),
      new Robot({ fromX: 4, toX: 30, y: 24 }),
    ],
    Theme.THEME8
  ),
  11: new Level(
    11,
    [
      new Wall(39, 0, 1, 'left'),
      new Wall(39, 7, 18, 'left'),
      new Wall(0, 0, 19, 'right'),
      new Platform(0, 24, 9),
      new Platform(21, 24, 9),

      new Platform(4, 18, 7),
      new Platform(21, 18, 7.5),

      new Platform(4, 12, 3),
      new Platform(13, 12, 7),
      new Platform(30, 12, 3),

      new Platform(1, 6, 4.5),
      new Platform(13, 6, 7),
      new Platform(30, 6, 5.5),

      new Elevator(1, 18, 1),
      new ElevatorSpot(1, 12, 1),

      new Elevator(18, 24, 2),
      new ElevatorSpot(18, 18, 2),

      new Elevator(36, 18, 3),
      new ElevatorSpot(36, 12, 3),

      new Elevator(10, 12, 4),
      new ElevatorSpot(10, 6, 4),

      new Elevator(27, 12, 5),
      new ElevatorSpot(27, 6, 5),

      new Terminal(7, 24),
      new Terminal(33, 6),

      new Searchable('deskWithLamp', 14, 12),
      new Searchable('candyMachine', 22, 12),

      new Robot({ fromX: 21, toX: 39, y: 24 }),
      new Robot({ fromX: 21, toX: 36, y: 18 }),
      new Robot({ fromX: 13, toX: 27, y: 12 }),
      new Robot({ fromX: 13, toX: 27, y: 6 }),
    ],
    Theme.THEME9
  ),
  12: new Level(
    12,
    [
      new Wall(0, 0, 1, 'right'),
      new Wall(0, 7, 18, 'right'),
      new Wall(39, 0, 19, 'left'),
      new Platform(4, 24, 16),
      new Platform(4, 18, 16),
      new Platform(4, 12, 16),
      new Platform(4, 6, 16),
      new Platform(0, 6, 0.5),
      new Platform(39, 24, 1),

      new Elevator(1, 6, 1),
      new Elevator(1, 12, 1),
      new ElevatorSpot(1, 18, 1),
      new ElevatorSpot(1, 24, 1),

      new ElevatorSpot(36, 6, 2),
      new Elevator(36, 12, 2),
      new Elevator(36, 18, 2),
      new Elevator(36, 24, 2),

      new Terminal(5, 6),
      new Terminal(32, 24),

      new Searchable('bookshelf', 26, 12),
      new Searchable('bookshelf', 17, 18),
      new Searchable('couchWithLamp', 22, 18),
      new Searchable('bookshelf', 11, 24),

      new Robot({ fromX: 10, toX: 36, y: 6 }),
      new Robot({ fromX: 4, toX: 36, y: 12 }),
      new Robot({ fromX: 4, toX: 36, y: 18 }),
      new Robot({ fromX: 4, toX: 30, y: 24 }),
    ],
    Theme.THEME8
  ),
  13: new Level(
    13,
    [
      new Wall(39, 0, 1, 'left'),
      new Wall(39, 7, 18, 'left'),
      new Wall(0, 0, 19, 'right'),
      new Platform(0, 24, 9),
      new Platform(21, 24, 9),

      new Platform(4, 18, 7),
      new Platform(21, 18, 7.5),

      new Platform(4, 12, 3),
      new Platform(13, 12, 7),
      new Platform(30, 12, 3),

      new Platform(1, 6, 4.5),
      new Platform(13, 6, 7),
      new Platform(30, 6, 5.5),

      new Elevator(1, 18, 1),
      new ElevatorSpot(1, 12, 1),

      new Elevator(18, 24, 2),
      new ElevatorSpot(18, 18, 2),

      new Elevator(36, 18, 3),
      new ElevatorSpot(36, 12, 3),

      new Elevator(10, 12, 4),
      new ElevatorSpot(10, 6, 4),

      new Elevator(27, 12, 5),
      new ElevatorSpot(27, 6, 5),

      new Terminal(7, 24),
      new Terminal(33, 6),

      new Searchable('deskWithLamp', 14, 12),
      new Searchable('candyMachine', 22, 12),

      new Robot({ fromX: 21, toX: 39, y: 24 }),
      new Robot({ fromX: 21, toX: 36, y: 18 }),
      new Robot({ fromX: 13, toX: 27, y: 12 }),
      new Robot({ fromX: 13, toX: 27, y: 6 }),
    ],
    Theme.THEME9
  ),
  14: new Level(
    14,
    [
      new Wall(0, 0, 1, 'right'),
      new Wall(0, 7, 18, 'right'),
      new Wall(39, 0, 19, 'left'),
      new Platform(4, 24, 16),
      new Platform(4, 18, 16),
      new Platform(4, 12, 16),
      new Platform(4, 6, 16),
      new Platform(0, 6, 0.5),
      new Platform(39, 24, 1),

      new Elevator(1, 6, 1),
      new Elevator(1, 12, 1),
      new ElevatorSpot(1, 18, 1),
      new ElevatorSpot(1, 24, 1),

      new ElevatorSpot(36, 6, 2),
      new Elevator(36, 12, 2),
      new Elevator(36, 18, 2),
      new Elevator(36, 24, 2),

      new Terminal(5, 6),
      new Terminal(32, 24),

      new Searchable('bookshelf', 26, 12),
      new Searchable('bookshelf', 17, 18),
      new Searchable('couchWithLamp', 22, 18),
      new Searchable('bookshelf', 11, 24),

      new Robot({ fromX: 10, toX: 36, y: 6 }),
      new Robot({ fromX: 4, toX: 36, y: 12 }),
      new Robot({ fromX: 4, toX: 36, y: 18 }),
      new Robot({ fromX: 4, toX: 30, y: 24 }),
    ],
    Theme.THEME8
  ),
  15: new Level(
    15,
    [
      new Wall(39, 0, 1, 'left'),
      new Wall(39, 7, 18, 'left'),
      new Wall(0, 0, 19, 'right'),
      new Platform(0, 24, 9),
      new Platform(21, 24, 9),

      new Platform(4, 18, 7),
      new Platform(21, 18, 7.5),

      new Platform(4, 12, 3),
      new Platform(13, 12, 7),
      new Platform(30, 12, 3),

      new Platform(1, 6, 4.5),
      new Platform(13, 6, 7),
      new Platform(30, 6, 5.5),

      new Elevator(1, 18, 1),
      new ElevatorSpot(1, 12, 1),

      new Elevator(18, 24, 2),
      new ElevatorSpot(18, 18, 2),

      new Elevator(36, 18, 3),
      new ElevatorSpot(36, 12, 3),

      new Elevator(10, 12, 4),
      new ElevatorSpot(10, 6, 4),

      new Elevator(27, 12, 5),
      new ElevatorSpot(27, 6, 5),

      new Terminal(7, 24),
      new Terminal(33, 6),

      new Searchable('deskWithLamp', 14, 12),
      new Searchable('candyMachine', 22, 12),

      new Robot({ fromX: 21, toX: 39, y: 24 }),
      new Robot({ fromX: 21, toX: 36, y: 18 }),
      new Robot({ fromX: 13, toX: 27, y: 12 }),
      new Robot({ fromX: 13, toX: 27, y: 6 }),
    ],
    Theme.THEME9
  ),
  16: new Level(
    16,
    [
      new Wall(0, 0, 1, 'right'),
      new Wall(0, 7, 18, 'right'),
      new Wall(39, 0, 30, 'left'),
      new Platform(4, 24, 1),
      new Platform(9, 24, 15),

      new Platform(4, 18, 1),
      new Platform(9, 18, 1),
      new Platform(14, 18, 1),
      new Platform(19, 18, 10),

      new Platform(1, 12, 5),
      new Platform(14, 12, 1),
      new Platform(19, 12, 1),
      new Platform(24, 12, 1),
      new Platform(29, 12, 5),

      new Platform(0, 6, 10.5),
      new Platform(24, 6, 1),
      new Platform(29, 6, 5),

      new Elevator(1, 24, 1),
      new ElevatorSpot(1, 18, 1),

      new Elevator(6, 24, 2),
      new ElevatorSpot(6, 18, 2),

      new Elevator(11, 18, 3),
      new ElevatorSpot(11, 12, 3),

      new Elevator(16, 18, 4),
      new ElevatorSpot(16, 12, 4),

      new Elevator(21, 12, 5),
      new ElevatorSpot(21, 6, 5),

      new Elevator(26, 12, 6),
      new ElevatorSpot(26, 6, 6),

      new Terminal(5, 6),
      new Terminal(10, 24),

      new Searchable('wideControlPanel', 14, 24),
      new Searchable('scanner', 20, 24),
      new Searchable('scanner', 24, 24),
      new Searchable('scanner', 28, 24),

      new Searchable('deskWithLamp', 25, 18),
      new Searchable('deskWithComputer', 33, 18),

      new Robot({ fromX: 29, toX: 39, y: 6 }),
      new Robot({ fromX: 1, toX: 11, y: 12 }),
      new Robot({ fromX: 19, toX: 39, y: 18 }),
      new Robot({ fromX: 9, toX: 39, y: 24 }),
    ],
    Theme.THEME16
  ),
  18: new Level(
    18,
    [
      new Wall(0, 0, 1, 'right'),
      new Wall(0, 7, 18, 'right'),
      new Wall(39, 0, 30, 'left'),
      new Platform(4, 24, 1),
      new Platform(9, 24, 15),

      new Platform(4, 18, 1),
      new Platform(9, 18, 1),
      new Platform(14, 18, 1),
      new Platform(19, 18, 10),

      new Platform(1, 12, 5),
      new Platform(14, 12, 1),
      new Platform(19, 12, 1),
      new Platform(24, 12, 1),
      new Platform(29, 12, 5),

      new Platform(0, 6, 10.5),
      new Platform(24, 6, 1),
      new Platform(29, 6, 5),

      new Elevator(1, 24, 1),
      new ElevatorSpot(1, 18, 1),

      new Elevator(6, 24, 2),
      new ElevatorSpot(6, 18, 2),

      new Elevator(11, 18, 3),
      new ElevatorSpot(11, 12, 3),

      new Elevator(16, 18, 4),
      new ElevatorSpot(16, 12, 4),

      new Elevator(21, 12, 5),
      new ElevatorSpot(21, 6, 5),

      new Elevator(26, 12, 6),
      new ElevatorSpot(26, 6, 6),

      new Terminal(5, 6),
      new Terminal(10, 24),

      new Searchable('wideControlPanel', 14, 24),
      new Searchable('scanner', 20, 24),
      new Searchable('scanner', 24, 24),
      new Searchable('scanner', 28, 24),

      new Searchable('deskWithLamp', 25, 18),
      new Searchable('deskWithComputer', 33, 18),

      new Robot({ fromX: 29, toX: 39, y: 6 }),
      new Robot({ fromX: 1, toX: 11, y: 12 }),
      new Robot({ fromX: 19, toX: 39, y: 18 }),
      new Robot({ fromX: 9, toX: 39, y: 24 }),
    ],
    Theme.THEME16
  ),
  19: new Level(
    19,
    [
      new Wall(39, 0, 25, 'left'),
      new Wall(0, 0, 19, 'right'),

      new Platform(0, 24, 1.5),
      new Platform(6, 24, 5.5),

      new Platform(23, 24, 6.5),
      new Platform(23, 18, 6.5),
      new Platform(23, 12, 1.5),
      new Platform(29, 12, 3.5),
      new Platform(26, 9, 1.5),
      new Platform(29, 6, 5),

      new Platform(8, 12, 1.5),
      new Platform(11, 9, 1.5),
      new Platform(14, 6, 1.5),
      new Platform(4, 4, 2),
      new Platform(4, 14, 2),

      new Elevator(3, 24, 1),
      new ElevatorSpot(3, 20, 1),

      new Elevator(1, 14, 2),
      new ElevatorSpot(1, 4, 2),

      new Elevator(17, 24, 3),
      new Elevator(17, 18, 3),
      new ElevatorSpot(17, 12, 3),
      new ElevatorSpot(17, 6, 3),

      new Elevator(20, 24, 4),
      new Elevator(20, 18, 4),
      new ElevatorSpot(20, 12, 4),
      new ElevatorSpot(20, 6, 4),

      new Elevator(36, 18, 5),
      new Elevator(36, 12, 5),
      new ElevatorSpot(36, 24, 5),

      new Searchable('controlPanel', 5, 4),
      new Searchable('vendingMachine', 36, 6),
      new Searchable('wideControlPanel', 30, 12),
      new Searchable('deskWithLamp', 26, 24),

      new Terminal(7, 24),

      new Robot({ fromX: 23, toX: 36, y: 24 }),
      new Robot({ fromX: 23, toX: 36, y: 18 }),
      new Robot({ fromX: 29, toX: 39, y: 6 }),
    ],
    Theme.THEME19
  ),
  20: new Level(
    20,
    [
      new Wall(0, 0, 1, 'right'),
      new Wall(0, 7, 18, 'right'),
      new Wall(39, 0, 30, 'left'),
      new Platform(4, 24, 1),
      new Platform(9, 24, 15),

      new Platform(4, 18, 1),
      new Platform(9, 18, 1),
      new Platform(14, 18, 1),
      new Platform(19, 18, 10),

      new Platform(1, 12, 5),
      new Platform(14, 12, 1),
      new Platform(19, 12, 1),
      new Platform(24, 12, 1),
      new Platform(29, 12, 5),

      new Platform(0, 6, 10.5),
      new Platform(24, 6, 1),
      new Platform(29, 6, 5),

      new Elevator(1, 24, 1),
      new ElevatorSpot(1, 18, 1),

      new Elevator(6, 24, 2),
      new ElevatorSpot(6, 18, 2),

      new Elevator(11, 18, 3),
      new ElevatorSpot(11, 12, 3),

      new Elevator(16, 18, 4),
      new ElevatorSpot(16, 12, 4),

      new Elevator(21, 12, 5),
      new ElevatorSpot(21, 6, 5),

      new Elevator(26, 12, 6),
      new ElevatorSpot(26, 6, 6),

      new Terminal(5, 6),
      new Terminal(10, 24),

      new Searchable('wideControlPanel', 14, 24),
      new Searchable('scanner', 20, 24),
      new Searchable('scanner', 24, 24),
      new Searchable('scanner', 28, 24),

      new Searchable('deskWithLamp', 25, 18),
      new Searchable('deskWithComputer', 33, 18),

      new Robot({ fromX: 29, toX: 39, y: 6 }),
      new Robot({ fromX: 1, toX: 11, y: 12 }),
      new Robot({ fromX: 19, toX: 39, y: 18 }),
      new Robot({ fromX: 9, toX: 39, y: 24 }),
    ],
    Theme.THEME16
  ),
  21: new Level(
    21,
    [
      new Wall(39, 0, 25, 'left'),
      new Wall(0, 0, 19, 'right'),

      new Platform(0, 24, 1.5),
      new Platform(6, 24, 5.5),

      new Platform(23, 24, 6.5),
      new Platform(23, 18, 6.5),
      new Platform(23, 12, 1.5),
      new Platform(29, 12, 3.5),
      new Platform(26, 9, 1.5),
      new Platform(29, 6, 5),

      new Platform(8, 12, 1.5),
      new Platform(11, 9, 1.5),
      new Platform(14, 6, 1.5),
      new Platform(4, 4, 2),
      new Platform(4, 14, 2),

      new Elevator(3, 24, 1),
      new ElevatorSpot(3, 20, 1),

      new Elevator(1, 14, 2),
      new ElevatorSpot(1, 4, 2),

      new Elevator(17, 24, 3),
      new Elevator(17, 18, 3),
      new ElevatorSpot(17, 12, 3),
      new ElevatorSpot(17, 6, 3),

      new Elevator(20, 24, 4),
      new Elevator(20, 18, 4),
      new ElevatorSpot(20, 12, 4),
      new ElevatorSpot(20, 6, 4),

      new Elevator(36, 18, 5),
      new Elevator(36, 12, 5),
      new ElevatorSpot(36, 24, 5),

      new Searchable('controlPanel', 5, 4),
      new Searchable('vendingMachine', 36, 6),
      new Searchable('wideControlPanel', 30, 12),
      new Searchable('deskWithLamp', 26, 24),

      new Terminal(7, 24),

      new Robot({ fromX: 23, toX: 36, y: 24 }),
      new Robot({ fromX: 23, toX: 36, y: 18 }),
      new Robot({ fromX: 29, toX: 39, y: 6 }),
    ],
    Theme.THEME19
  ),
  22: new Level(
    22,
    [
      new Wall(0, 0, 1, 'right'),
      new Wall(0, 7, 18, 'right'),
      new Wall(39, 0, 30, 'left'),
      new Platform(4, 24, 1),
      new Platform(9, 24, 15),

      new Platform(4, 18, 1),
      new Platform(9, 18, 1),
      new Platform(14, 18, 1),
      new Platform(19, 18, 10),

      new Platform(1, 12, 5),
      new Platform(14, 12, 1),
      new Platform(19, 12, 1),
      new Platform(24, 12, 1),
      new Platform(29, 12, 5),

      new Platform(0, 6, 10.5),
      new Platform(24, 6, 1),
      new Platform(29, 6, 5),

      new Elevator(1, 24, 1),
      new ElevatorSpot(1, 18, 1),

      new Elevator(6, 24, 2),
      new ElevatorSpot(6, 18, 2),

      new Elevator(11, 18, 3),
      new ElevatorSpot(11, 12, 3),

      new Elevator(16, 18, 4),
      new ElevatorSpot(16, 12, 4),

      new Elevator(21, 12, 5),
      new ElevatorSpot(21, 6, 5),

      new Elevator(26, 12, 6),
      new ElevatorSpot(26, 6, 6),

      new Terminal(5, 6),
      new Terminal(10, 24),

      new Searchable('wideControlPanel', 14, 24),
      new Searchable('scanner', 20, 24),
      new Searchable('scanner', 24, 24),
      new Searchable('scanner', 28, 24),

      new Searchable('deskWithLamp', 25, 18),
      new Searchable('deskWithComputer', 33, 18),

      new Robot({ fromX: 29, toX: 39, y: 6 }),
      new Robot({ fromX: 1, toX: 11, y: 12 }),
      new Robot({ fromX: 19, toX: 39, y: 18 }),
      new Robot({ fromX: 9, toX: 39, y: 24 }),
    ],
    Theme.THEME16
  ),
  23: new Level(
    23,
    [
      new Wall(39, 0, 25, 'left'),
      new Wall(0, 0, 19, 'right'),

      new Platform(0, 24, 1.5),
      new Platform(6, 24, 5.5),

      new Platform(23, 24, 6.5),
      new Platform(23, 18, 6.5),
      new Platform(23, 12, 1.5),
      new Platform(29, 12, 3.5),
      new Platform(26, 9, 1.5),
      new Platform(29, 6, 5),

      new Platform(8, 12, 1.5),
      new Platform(11, 9, 1.5),
      new Platform(14, 6, 1.5),
      new Platform(4, 4, 2),
      new Platform(4, 14, 2),

      new Elevator(3, 24, 1),
      new ElevatorSpot(3, 20, 1),

      new Elevator(1, 14, 2),
      new ElevatorSpot(1, 4, 2),

      new Elevator(17, 24, 3),
      new Elevator(17, 18, 3),
      new ElevatorSpot(17, 12, 3),
      new ElevatorSpot(17, 6, 3),

      new Elevator(20, 24, 4),
      new Elevator(20, 18, 4),
      new ElevatorSpot(20, 12, 4),
      new ElevatorSpot(20, 6, 4),

      new Elevator(36, 18, 5),
      new Elevator(36, 12, 5),
      new ElevatorSpot(36, 24, 5),

      new Searchable('controlPanel', 5, 4),
      new Searchable('vendingMachine', 36, 6),
      new Searchable('wideControlPanel', 30, 12),
      new Searchable('deskWithLamp', 26, 24),

      new Terminal(7, 24),

      new Robot({ fromX: 23, toX: 36, y: 24 }),
      new Robot({ fromX: 23, toX: 36, y: 18 }),
      new Robot({ fromX: 29, toX: 39, y: 6 }),
    ],
    Theme.THEME19
  ), // without right exit
  24: new Level(
    24,
    [
      new Wall(39, 0, 1, 'left'),
      new Wall(39, 7, 18, 'left'),
      new Wall(0, 0, 30, 'right'),
      new Platform(4, 24, 1.5),
      new Platform(4, 18, 1.5),
      new Platform(4, 12, 1.5),
      new Platform(4, 6, 1.5),

      new Platform(9, 21, 3),
      new Platform(9, 15, 3),
      new Platform(9, 9, 3),

      new Platform(15, 24, 4),
      new Platform(17, 18, 3),
      new Platform(17, 12, 3),

      new Platform(25, 21, 7),
      new Platform(25, 15, 3),
      new Platform(25, 9, 3),
      new Platform(33, 12, 3),

      new Platform(35, 6, 3),

      new Elevator(1, 6, 1),
      new ElevatorSpot(1, 12, 1),
      new ElevatorSpot(1, 18, 1),
      new ElevatorSpot(1, 24, 1),

      new Terminal(35, 6),
      new Searchable('scanner', 4, 24),

      new Searchable('vendingMachine', 29, 21),
      new Searchable('vendingMachine', 32, 21),
      new Searchable('vendingMachine', 35, 21),

      new Robot({ fromX: 15, toX: 23, y: 24 }),
      new Robot({ fromX: 25, toX: 39, y: 21 }),
    ],
    Theme.THEME16
  ), // without left exit
  25: new Level(
    25,
    [
      new Wall(39, 0, 19, 'left'),
      new Wall(0, 0, 30, 'right'),

      new Platform(4, 24, 7.5),
      new Platform(4, 18, 7.5),
      new Platform(4, 12, 7.5),
      new Platform(4, 6, 7.5),
      new Platform(22, 24, 9.5),
      new Platform(22, 15, 7),
      new Platform(22, 9, 7),

      new Elevator(1, 6, 1),
      new Elevator(1, 12, 1),
      new ElevatorSpot(1, 18, 1),
      new ElevatorSpot(1, 24, 1),

      new ElevatorSpot(19, 6, 2),
      new ElevatorSpot(19, 12, 2),
      new Elevator(19, 18, 2),
      new Elevator(19, 24, 2),

      new Elevator(36, 15, 3),
      new ElevatorSpot(36, 9, 3),

      new Terminal(32, 24),
      new Terminal(10, 12),

      new Searchable('vendingMachine', 23, 9),
      new Searchable('vendingMachine', 26, 9),
      new Searchable('vendingMachine', 29, 9),
      new Searchable('deskWithComputer', 32, 9),
      new Searchable('deskWithLamp', 23, 15),
      new Searchable('scanner', 31, 15),

      new Robot({ fromX: 4, toX: 19, y: 12 }),
    ],
    Theme.THEME31
  ),
  26: new Level(
    26,
    [
      new Wall(39, 0, 1, 'left'),
      new Wall(39, 7, 18, 'left'),
      new Wall(0, 0, 30, 'right'),
      new Platform(4, 24, 1.5),
      new Platform(4, 18, 1.5),
      new Platform(4, 12, 1.5),
      new Platform(4, 6, 1.5),

      new Platform(9, 21, 3),
      new Platform(9, 15, 3),
      new Platform(9, 9, 3),

      new Platform(15, 24, 4),
      new Platform(17, 18, 3),
      new Platform(17, 12, 3),

      new Platform(25, 21, 7),
      new Platform(25, 15, 3),
      new Platform(25, 9, 3),
      new Platform(33, 12, 3),

      new Platform(35, 6, 3),

      new Elevator(1, 6, 1),
      new ElevatorSpot(1, 12, 1),
      new ElevatorSpot(1, 18, 1),
      new ElevatorSpot(1, 24, 1),

      new Terminal(35, 6),
      new Searchable('scanner', 4, 24),

      new Searchable('vendingMachine', 29, 21),
      new Searchable('vendingMachine', 32, 21),
      new Searchable('vendingMachine', 35, 21),

      new Robot({ fromX: 15, toX: 23, y: 24 }),
      new Robot({ fromX: 25, toX: 39, y: 21 }),
      new Ball(450, 330),
    ],
    Theme.THEME16
  ),
  28: new Level(
    28,
    [
      new Wall(39, 0, 1, 'left'),
      new Wall(39, 7, 18, 'left'),
      new Wall(0, 0, 30, 'right'),
      new Platform(4, 24, 1.5),
      new Platform(4, 18, 1.5),
      new Platform(4, 12, 1.5),
      new Platform(4, 6, 1.5),

      new Platform(9, 21, 3),
      new Platform(9, 15, 3),
      new Platform(9, 9, 3),

      new Platform(15, 24, 4),
      new Platform(17, 18, 3),
      new Platform(17, 12, 3),

      new Platform(25, 21, 7),
      new Platform(25, 15, 3),
      new Platform(25, 9, 3),
      new Platform(33, 12, 3),

      new Platform(35, 6, 3),

      new Elevator(1, 6, 1),
      new ElevatorSpot(1, 12, 1),
      new ElevatorSpot(1, 18, 1),
      new ElevatorSpot(1, 24, 1),

      new Terminal(35, 6),
      new Searchable('scanner', 4, 24),

      new Searchable('vendingMachine', 29, 21),
      new Searchable('vendingMachine', 32, 21),
      new Searchable('vendingMachine', 35, 21),

      new Robot({ fromX: 15, toX: 23, y: 24 }),
      new Robot({ fromX: 25, toX: 39, y: 21 }),
    ],
    Theme.THEME16
  ),
  29: new Level(
    29,
    [
      new Wall(39, 0, 19, 'left'),
      new Wall(0, 0, 30, 'right'),

      new Platform(4, 24, 7.5),
      new Platform(4, 18, 7.5),
      new Platform(4, 12, 7.5),
      new Platform(4, 6, 7.5),
      new Platform(22, 24, 9.5),
      new Platform(22, 15, 7),
      new Platform(22, 9, 7),

      new Elevator(1, 6, 1),
      new Elevator(1, 12, 1),
      new ElevatorSpot(1, 18, 1),
      new ElevatorSpot(1, 24, 1),

      new ElevatorSpot(19, 6, 2),
      new ElevatorSpot(19, 12, 2),
      new Elevator(19, 18, 2),
      new Elevator(19, 24, 2),

      new Elevator(36, 15, 3),
      new ElevatorSpot(36, 9, 3),

      new Terminal(32, 24),
      new Terminal(10, 12),

      new Searchable('vendingMachine', 23, 9),
      new Searchable('vendingMachine', 26, 9),
      new Searchable('vendingMachine', 29, 9),
      new Searchable('deskWithComputer', 32, 9),
      new Searchable('deskWithLamp', 23, 15),
      new Searchable('scanner', 31, 15),

      new Robot({ fromX: 4, toX: 19, y: 12 }),
    ],
    Theme.THEME31
  ),
  30: new Level(
    30,
    [
      new Wall(39, 0, 1, 'left'),
      new Wall(39, 7, 18, 'left'),
      new Wall(0, 0, 30, 'right'),
      new Platform(4, 24, 1.5),
      new Platform(4, 18, 1.5),
      new Platform(4, 12, 1.5),
      new Platform(4, 6, 1.5),

      new Platform(9, 21, 3),
      new Platform(9, 15, 3),
      new Platform(9, 9, 3),

      new Platform(15, 24, 4),
      new Platform(17, 18, 3),
      new Platform(17, 12, 3),

      new Platform(25, 21, 7),
      new Platform(25, 15, 3),
      new Platform(25, 9, 3),
      new Platform(33, 12, 3),

      new Platform(35, 6, 3),

      new Elevator(1, 6, 1),
      new ElevatorSpot(1, 12, 1),
      new ElevatorSpot(1, 18, 1),
      new ElevatorSpot(1, 24, 1),

      new Terminal(35, 6),
      new Searchable('scanner', 4, 24),

      new Searchable('vendingMachine', 29, 21),
      new Searchable('vendingMachine', 32, 21),
      new Searchable('vendingMachine', 35, 21),

      new Robot({ fromX: 15, toX: 23, y: 24 }),
      new Robot({ fromX: 25, toX: 39, y: 21 }),
    ],
    Theme.THEME16
  ),
  31: new Level(
    31,
    [
      new Wall(39, 0, 19, 'left'),
      new Wall(0, 0, 30, 'right'),

      new Platform(4, 24, 7.5),
      new Platform(4, 18, 7.5),
      new Platform(4, 12, 7.5),
      new Platform(4, 6, 7.5),
      new Platform(22, 24, 9.5),
      new Platform(22, 15, 7),
      new Platform(22, 9, 7),

      new Elevator(1, 6, 1),
      new Elevator(1, 12, 1),
      new ElevatorSpot(1, 18, 1),
      new ElevatorSpot(1, 24, 1),

      new ElevatorSpot(19, 6, 2),
      new ElevatorSpot(19, 12, 2),
      new Elevator(19, 18, 2),
      new Elevator(19, 24, 2),

      new Elevator(36, 15, 3),
      new ElevatorSpot(36, 9, 3),

      new Terminal(32, 24),
      new Terminal(10, 12),

      new Searchable('vendingMachine', 23, 9),
      new Searchable('vendingMachine', 26, 9),
      new Searchable('vendingMachine', 29, 9),
      new Searchable('deskWithComputer', 32, 9),
      new Searchable('deskWithLamp', 23, 15),
      new Searchable('scanner', 31, 15),

      new Robot({ fromX: 4, toX: 19, y: 12 }),
    ],
    Theme.THEME31
  ),
  0: new Level(
    0,
    [
      new Wall(0, 0, 19, 'right'),
      new Wall(39, 0, 19, 'left'),

      // platforms
      new Platform(0, 24, 0.5),
      new Platform(4, 24, 11),
      new Platform(29, 24, 5.5),
      // 1
      new Platform(4, 18, 5),
      new Platform(17, 15, 4.5),
      new Platform(29, 18, 5),
      // 2
      new Platform(29, 12, 5),
      new Platform(8, 9, 9),
      // 3
      new Platform(1, 6, 2),
      new Platform(29, 6, 5),
      // elevators
      new Elevator(1, 24, 1),
      new ElevatorSpot(1, 18, 1),

      new Elevator(14, 18, 2),
      new ElevatorSpot(14, 15, 2),

      new Elevator(26, 15, 3),
      new ElevatorSpot(26, 24, 3),
      new ElevatorSpot(26, 9, 3),

      // computers
      new Terminal(5, 24),

      //searchables
      new Searchable('scanner', 2, 6),
      new Searchable('vendingMachine', 30, 6),
      new Searchable('wideControlPanel', 15, 9),
      //robots
      new Robot({ fromX: 4, toX: 14, y: 18 }),
      new Robot({ fromX: 17, toX: 26, y: 15 }),
      new Robot({ fromX: 29, toX: 39, y: 12 }),
      new Robot({ fromX: 8, toX: 26, y: 9 }),
    ],
    Theme.THEME2
  ),
});

export const BLUE = '#30E6C6';
export const GREEN = '#1FD21E';
export const YELLOW = '#DFF60A';

export type LEVEL_COLORS = typeof BLUE | typeof GREEN | typeof YELLOW;

export function getRGB(color: LEVEL_COLORS): Pixel {
  if (color === BLUE) return [48, 230, 198] as Pixel;
  else if (color === GREEN) return [31, 210, 30] as Pixel;
  else if (color === YELLOW) return [223, 246, 10] as Pixel;
  else return [0, 0, 0] as Pixel;
}

export interface Entries {
  left: 'top' | 'bottom' | null;
  right: 'top' | 'bottom' | null;
  color: LEVEL_COLORS;
}

export const levelsEntries: { [id: number]: Entries } = {
  0: {
    left: 'bottom',
    right: 'bottom',
    color: YELLOW,
  },
  1: {
    left: 'top',
    right: 'top',
    color: BLUE,
  },
  2: {
    left: 'bottom',
    right: 'bottom',
    color: GREEN,
  },
  3: {
    left: 'top',
    right: 'top',
    color: YELLOW,
  },
  4: {
    left: 'bottom',
    right: 'bottom',
    color: YELLOW,
  },
  6: {
    left: 'bottom',
    right: 'bottom',
    color: YELLOW,
  },
  7: {
    left: 'top',
    right: 'top',
    color: YELLOW,
  },
  8: {
    left: 'top',
    right: 'bottom',
    color: BLUE,
  },
  9: {
    left: 'bottom',
    right: 'top',
    color: BLUE,
  },
  10: {
    left: 'top',
    right: 'bottom',
    color: BLUE,
  },
  11: {
    left: 'bottom',
    right: 'top',
    color: GREEN,
  },
  12: {
    left: 'top',
    right: 'bottom',
    color: GREEN,
  },
  13: {
    left: 'bottom',
    right: 'top',
    color: GREEN,
  },
  14: {
    left: 'top',
    right: 'bottom',
    color: BLUE,
  },
  15: {
    left: 'bottom',
    right: 'top',
    color: YELLOW,
  },
  16: {
    left: 'top',
    right: null,
    color: GREEN,
  },
  18: {
    left: 'top',
    right: null,
    color: GREEN,
  },
  19: {
    left: 'bottom',
    right: null,
    color: BLUE,
  },
  20: {
    left: 'top',
    right: null,
    color: YELLOW,
  },
  21: {
    left: 'bottom',
    right: null,
    color: BLUE,
  },
  22: {
    left: 'top',
    right: null,
    color: BLUE,
  },
  23: {
    left: 'bottom',
    right: null,
    color: BLUE,
  },
  24: {
    left: null,
    right: 'top',
    color: GREEN,
  },
  25: {
    left: null,
    right: 'bottom',
    color: YELLOW,
  },
  26: {
    left: null,
    right: 'top',
    color: GREEN,
  },
  28: {
    left: null,
    right: 'top',
    color: GREEN,
  },
  29: {
    left: null,
    right: 'bottom',
    color: BLUE,
  },
  30: {
    left: null,
    right: 'top',
    color: BLUE,
  },
  31: {
    left: null,
    right: 'bottom',
    color: GREEN,
  },
};
