import BuildingsSprites from '../sprites/BuildingsSprites';
import ElevatorCorridorSprites from '../sprites/ElevatorCorridorSprites';
import InfoSprites from '../sprites/InfoSprites';
import PlayerSprites from '../sprites/PlayerSprites';
import RobotSprites from '../sprites/RobotSprites';
import SearchablesSprites from '../sprites/SearchablesSprites';

class Assets {
  static playerSprites: PlayerSprites;
  static buildingsSprites: BuildingsSprites;
  static robotSprites: RobotSprites;
  static infoSprites: InfoSprites;
  static searchablesSprites: SearchablesSprites;
  static elevatorCorridorSprites: ElevatorCorridorSprites;

  static async loadAssets() {
    const images = new Promise<void>((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        this.playerSprites = new PlayerSprites(image);
        this.buildingsSprites = new BuildingsSprites(image);
        this.robotSprites = new RobotSprites(image);
        this.infoSprites = new InfoSprites(image);
        this.searchablesSprites = new SearchablesSprites(image);
        this.elevatorCorridorSprites = new ElevatorCorridorSprites(image);

        resolve();
      };
      image.src = './assets/sprites/main_sprites.png';
    });

    const c64font = new FontFace('c64', 'url(assets/c64font.woff)');
    const font = c64font.load().then((font) => {
      // @ts-ignore
      document.fonts.add(font);
    });
    return Promise.all([images, font]);
  }
}

export default Assets;
