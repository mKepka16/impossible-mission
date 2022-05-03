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
  // color7: Pixel;
  // color8: Pixel;
  // color9: Pixel;
  // color10: Pixel;
  // color11: Pixel;
  // color12: Pixel;
  // color13: Pixel;
  // color14: Pixel;
  // color15: Pixel;
}

class Theme {
  static THEME1 = new Theme(
    [112, 116, 111], // primary
    [0, 0, 0], // secondary
    [95, 83, 254], // accent
    '#30e6c6', // bg
    [48, 230, 198],
    [240, 194, 58], // special
    [33, 27, 174], // robot primary
    [253, 254, 252], // robot secondary
    [223, 246, 10], // robot led on
    [137, 177, 3], // robot led off
    [112, 116, 111], // furniture primary
    [0, 0, 0], // furniture secondary
    [95, 83, 254], // furniture accent
    [126, 76, 160], // furniture purple
    [47, 52, 168], // furniture blue
    [0, 0, 0] // furniture black
  );

  primary: Pixel;
  secondary: Pixel;
  background: string;
  backgroundRGB: Pixel;
  accent: Pixel;
  special: Pixel;
  robot: RobotTheme;
  furniture: FurnitureTheme;

  constructor(
    primary: Pixel,
    secondary: Pixel,
    accent: Pixel,
    background: string,
    backgroundRGB: Pixel,
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
    furnitureColor6: Pixel
  ) {
    this.primary = primary;
    this.secondary = secondary;
    this.accent = accent;
    this.background = background;
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
    };
    this.backgroundRGB = backgroundRGB;
  }
}

export default Theme;
