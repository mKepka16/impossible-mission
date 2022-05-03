import Assets from '../general/Assets';
import BuildingsSprites from '../sprites/BuildingsSprites';
import { IRenderable } from '../collisions/IRenderable';
import { Rectangle } from '../collisions/Rectangle';
import Vector from '../general/Vector';

export type Side = 'left' | 'right';

class Wall extends Rectangle implements IRenderable {
  wallCount: number;
  side: Side;

  constructor(l: number, t: number, wallCount: number, side: Side) {
    const halfWallDimensions =
      BuildingsSprites.SPRITES.walls.left.getRealDimensions();
    const dimensions = new Vector(
      halfWallDimensions.x,
      halfWallDimensions.y * wallCount
    );

    super(l * 24, t * 24, dimensions.x, dimensions.y);
    this.wallCount = wallCount;
    this.side = side;
  }

  render() {
    Assets.buildingsSprites.renderWalls(
      new Vector(this.l, this.t),
      this.wallCount,
      this.side
    );
  }
}

export default Wall;
