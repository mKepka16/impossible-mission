import Assets from '../general/Assets';
import BuildingsSprites from '../sprites/BuildingsSprites';
import { IRenderable } from '../collisions/IRenderable';
import { Rectangle } from '../collisions/Rectangle';
import Vector from '../general/Vector';
import Debugger from '../general/Debugger';

class Platform extends Rectangle implements IRenderable {
  platformsCount: number;

  constructor(l: number, t: number, platformsCount: number) {
    const halfPlatformDimensions =
      BuildingsSprites.SPRITES.platform.left.getRealDimensions();
    const dimensions = new Vector(
      halfPlatformDimensions.x * platformsCount * 2,
      halfPlatformDimensions.y
    );

    super(
      l * 24,
      t * 24 - BuildingsSprites.SPRITES.platform.left.getRealOffset().y,
      dimensions.x,
      dimensions.y
    );
    this.platformsCount = platformsCount;
  }

  render() {
    Assets.buildingsSprites.renderPlatforms(
      new Vector(this.l, this.t),
      this.platformsCount
    );
    if (Debugger.showWallsAndPlatformsHitboxes) this.drawColliders('#11ee02');
    // this.drawColliders('#dd359a');
  }
}

export default Platform;
