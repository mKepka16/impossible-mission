import { Pixel } from '../../sprites/ThemedSprites';

class ElevatorTheme {
  border: Pixel;
  fill: Pixel;

  constructor(border: Pixel, fill: Pixel) {
    this.border = border;
    this.fill = fill;
  }
}

export default ElevatorTheme;
