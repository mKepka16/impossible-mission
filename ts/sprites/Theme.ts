import { Pixel } from './ThemedSprites';

interface RobotTheme {
  primary: Pixel;
  secondary: Pixel;
  ledOff: Pixel;
  ledOn: Pixel;
}

interface FurnitureTheme {
  color1: Pixel;
  color2: Pixel;
  color3: Pixel;
  color4: Pixel;
  color5: Pixel;
  color6: Pixel;
  color7: Pixel;
  color8: Pixel;
  color9: Pixel;
  color10: Pixel;
  color11: Pixel;
  color12: Pixel;
  color13: Pixel;
  color14: Pixel;
  color15: Pixel;
}

class Theme {
  // static THEME1 = new Theme(
  //   [112, 116, 111], // primary
  //   [0, 0, 0], // secondary
  //   [95, 83, 254], // accent
  //   [240, 194, 58], // special
  //   [33, 27, 174], // robot primary
  //   [253, 254, 252], // robot secondary
  //   [223, 246, 10], // robot led on
  //   [137, 177, 3], // robot led off
  //   [112, 116, 111], // furniture primary
  //   [0, 0, 0], // furniture secondary
  //   [95, 83, 254], // furniture accent
  //   [126, 76, 160], // furniture purple
  //   [47, 52, 168], // furniture blue
  //   [0, 0, 0] // furniture black
  // );
  static THEME0 = new Theme(
    [255, 0, 0], // platform fill
    [255, 0, 0], // platform border
    [255, 0, 0], // floor top
    [255, 0, 0], // elevator
    [255, 0, 0], // robot primary
    [255, 0, 0], // robot secondary
    [223, 246, 10], // robot led on
    [137, 177, 3], // robot led off
    [255, 0, 0], // fur 1
    [255, 0, 0], // fur 2
    [255, 0, 0], // fur 3
    [255, 0, 0], // fur 4
    [255, 0, 0], // fur 5
    [255, 0, 0], // fur 6
    [255, 0, 0], // fur 7
    [255, 0, 0], // fur 8
    [255, 0, 0], // fur 9
    [255, 0, 0], // fur 10
    [255, 0, 0], // fur 11
    [255, 0, 0], // fur 12
    [255, 0, 0], // fur 13
    [255, 0, 0], // fur 14
    [255, 0, 0] // fur 15
  );

  static THEME31 = new Theme(
    [155, 127, 233], // platform fill
    [222, 243, 117], // platform border
    [255, 255, 255], // floor top
    [222, 243, 117], // elevator
    [222, 243, 117], // robot primary
    [0, 0, 0], // robot secondary
    [223, 246, 10], // robot led on
    [137, 177, 3], // robot led off
    [255, 255, 255], // fur 1
    [255, 0, 100], // fur 2
    [255, 0, 100], // fur 3
    [198, 89, 169], // fur 4
    [255, 0, 100], // fur 5
    [86, 60, 160], // fur 6
    [222, 243, 117], // fur 7
    [255, 250, 0], // fur 8
    [255, 250, 0], // fur 9
    [255, 250, 0], // fur 10
    [255, 250, 0], // fur 11
    [255, 250, 0], // fur 12
    [255, 250, 0], // fur 13
    [155, 127, 233], // fur 14
    [255, 0, 0] // fur 15
  );

  static THEME26 = new Theme(
    [155, 127, 233], // platform fill
    [157, 183, 221], // platform border
    [255, 255, 255], // floor top
    [222, 243, 117], // elevator
    [228, 247, 142], // robot primary
    [183, 128, 19], // robot secondary
    [81, 119, 142], // robot led on
    [41, 89, 102], // robot led off
    [255, 255, 255], // fur 1
    [255, 0, 100], // fur 2
    [255, 0, 100], // fur 3
    [198, 89, 169], // fur 4
    [255, 0, 100], // fur 5
    [86, 60, 160], // fur 6
    [222, 243, 117], // fur 7
    [255, 250, 0], // fur 8
    [255, 250, 0], // fur 9
    [255, 250, 0], // fur 10
    [255, 250, 0], // fur 11
    [255, 250, 0], // fur 12
    [255, 250, 0], // fur 13
    [155, 127, 233], // fur 14
    [255, 0, 0] // fur 15
  );

  static THEME19 = new Theme(
    [168, 118, 18], // platform fill
    [144, 96, 41], // platform border
    [255, 255, 255], // floor top
    [222, 243, 117], // elevator
    [255, 255, 255], // robot primary
    [198, 89, 169], // robot secondary
    [168, 118, 18], // robot led on
    [144, 96, 41], // robot led off
    [255, 255, 255], // fur 1
    [0, 0, 100], // fur 2
    [0, 0, 100], // fur 3
    [198, 89, 169], // fur 4
    [78, 205, 128], // fur 5
    [86, 60, 160], // fur 6
    [222, 243, 117], // fur 7
    [0, 0, 0], // fur 8
    [0, 0, 0], // fur 9
    [0, 0, 0], // fur 10
    [0, 0, 0], // fur 11
    [0, 0, 0], // fur 12
    [0, 0, 0], // fur 13
    [168, 118, 18], // fur 14
    [0, 0, 0] // fur 15
  );

  static THEME16 = new Theme(
    [164, 164, 164], // platform fill
    [101, 83, 192], // platform border
    [255, 255, 255], // floor top
    [222, 243, 117], // elevator
    [101, 83, 192], // robot primary
    [255, 255, 255], // robot secondary
    [176, 243, 195], // robot led on
    [146, 213, 165], // robot led off
    [255, 255, 255], // fur 1
    [0, 0, 100], // fur 2
    [0, 0, 100], // fur 3
    [198, 89, 169], // fur 4
    [78, 205, 128], // fur 5
    [86, 60, 160], // fur 6
    [222, 243, 117], // fur 7
    [0, 0, 0], // fur 8
    [0, 0, 0], // fur 9
    [0, 0, 0], // fur 10
    [0, 0, 0], // fur 11
    [0, 0, 0], // fur 12
    [0, 0, 0], // fur 13
    [164, 164, 164], // fur 14
    [0, 0, 0] // fur 15
  );

  static THEME9 = new Theme(
    [169, 138, 253], // platform fill
    [199, 93, 176], // platform border
    [255, 255, 255], // floor top
    [222, 243, 117], // elevator
    [78, 205, 128], // robot primary
    [222, 243, 117], // robot secondary
    [229, 123, 206], // robot led on
    [199, 93, 176], // robot led off
    [255, 255, 255], // fur 1
    [0, 0, 100], // fur 2
    [0, 0, 100], // fur 3
    [198, 89, 169], // fur 4
    [78, 205, 128], // fur 5
    [86, 60, 160], // fur 6
    [222, 243, 117], // fur 7
    [0, 0, 0], // fur 8
    [0, 0, 0], // fur 9
    [169, 138, 253], // fur 10
    [0, 250, 0], // fur 11
    [0, 250, 0], // fur 12
    [0, 250, 0], // fur 13
    [169, 138, 253], // fur 14
    [0, 0, 0] // fur 15
  );

  static THEME8 = new Theme(
    [96, 86, 0], // platform fill
    [222, 243, 117], // platform border
    [149, 122, 224], // floor top
    [222, 243, 117], // elevator
    [255, 255, 255], // robot primary
    [0, 0, 0], // robot secondary
    [139, 106, 230], // robot led on
    [99, 66, 190], // robot led off
    [255, 255, 255], // fur 1
    [179, 96, 54], // fur 2
    [0, 0, 100], // fur 3
    [198, 89, 169], // fur 4
    [78, 205, 128], // fur 5
    [86, 60, 160], // fur 6
    [222, 243, 117], // fur 7
    [250, 0, 0], // fur 8
    [96, 86, 0], // fur 9
    [169, 138, 253], // fur 10
    [0, 250, 0], // fur 11
    [149, 122, 224], // fur 12
    [0, 250, 0], // fur 13
    [96, 86, 0], // fur 14
    [149, 122, 224] // fur 15
  );

  static THEME2 = new Theme(
    [155, 127, 233], // platform fill
    [157, 183, 221], // platform border
    [255, 255, 255], // floor top
    [222, 243, 117], // elevator
    [0, 0, 0], // robot primary
    [157, 183, 221], // robot secondary
    [242, 255, 137], // robot led on
    [222, 243, 117], // robot led off
    [255, 255, 255], // fur 1
    [255, 0, 100], // fur 2
    [255, 0, 100], // fur 3
    [198, 89, 169], // fur 4
    [255, 0, 100], // fur 5
    [86, 60, 160], // fur 6
    [222, 243, 117], // fur 7
    [255, 250, 0], // fur 8
    [255, 250, 0], // fur 9
    [255, 250, 0], // fur 10
    [255, 250, 0], // fur 11
    [255, 250, 0], // fur 12
    [255, 250, 0], // fur 13
    [155, 127, 233], // fur 14
    [255, 0, 0] // fur 15
  );

  static THEME1 = new Theme(
    [155, 127, 233], // platform fill
    [222, 243, 117], // platform border
    [255, 255, 255], // floor top
    [222, 243, 117], // elevator
    [155, 127, 233], // robot primary
    [255, 255, 255], // robot secondary
    [145, 137, 180], // robot led on
    [175, 167, 210], // robot led off
    [255, 255, 255], // fur 1
    [255, 0, 100], // fur 2
    [255, 0, 100], // fur 3
    [198, 89, 169], // fur 4
    [78, 205, 128], // fur 5
    [86, 60, 160], // fur 6
    [222, 243, 117], // fur 7
    [255, 250, 0], // fur 8
    [255, 250, 0], // fur 9
    [255, 250, 0], // fur 10
    [255, 250, 0], // fur 11
    [255, 250, 0], // fur 12
    [255, 250, 0], // fur 13
    [155, 127, 233], // fur 14
    [255, 0, 0] // fur 15
  );

  primary: Pixel;
  secondary: Pixel;
  accent: Pixel;
  special: Pixel;
  robot: RobotTheme;
  furniture: FurnitureTheme;

  constructor(
    primary: Pixel,
    secondary: Pixel,
    accent: Pixel,
    special: Pixel,
    robotPrimary: Pixel,
    robotSecondary: Pixel,
    robotLedOn: Pixel,
    robotLedOff: Pixel,
    furnitureColor1: Pixel,
    furnitureColor2: Pixel,
    furnitureColor3: Pixel,
    furnitureColor4: Pixel,
    furnitureColor5: Pixel,
    furnitureColor6: Pixel,
    furnitureColor7: Pixel,
    furnitureColor8: Pixel,
    furnitureColor9: Pixel,
    furnitureColor10: Pixel,
    furnitureColor11: Pixel,
    furnitureColor12: Pixel,
    furnitureColor13: Pixel,
    furnitureColor14: Pixel,
    furnitureColor15: Pixel
  ) {
    this.primary = primary;
    this.secondary = secondary;
    this.accent = accent;
    this.special = special;
    this.robot = {
      primary: robotPrimary,
      secondary: robotSecondary,
      ledOn: robotLedOn,
      ledOff: robotLedOff,
    };
    this.furniture = {
      color1: furnitureColor1,
      color2: furnitureColor2,
      color3: furnitureColor3,
      color4: furnitureColor4,
      color5: furnitureColor5,
      color6: furnitureColor6,
      color7: furnitureColor7,
      color8: furnitureColor8,
      color9: furnitureColor9,
      color10: furnitureColor10,
      color11: furnitureColor11,
      color12: furnitureColor12,
      color13: furnitureColor13,
      color14: furnitureColor14,
      color15: furnitureColor15,
    };
  }
}

export default Theme;
