import BuildingsSprites from '../sprites/BuildingsSprites';
import ElevatorCorridorSprites from '../sprites/ElevatorCorridorSprites';
import InfoSprites from '../sprites/InfoSprites';
import PlayerSprites from '../sprites/PlayerSprites';
import PocketComputerSprites from '../sprites/PocketComputerSprites';
import PuzzlesSprites from '../sprites/PuzzlesSprites';
import RobotSprites from '../sprites/RobotSprites';
import SearchablesSprites from '../sprites/SearchablesSprites';
import TerminalSprites from '../sprites/TerminalSprites';

class Assets {
  static playerSprites: PlayerSprites;
  static buildingsSprites: BuildingsSprites;
  static robotSprites: RobotSprites;
  static infoSprites: InfoSprites;
  static searchablesSprites: SearchablesSprites;
  static pocketComputerSprites: PocketComputerSprites;
  static elevatorCorridorSprites: ElevatorCorridorSprites;
  static terminalSprites: TerminalSprites = new TerminalSprites();
  static yellowPuzzlesSprites: PuzzlesSprites;
  static bluePuzzlesSprites: PuzzlesSprites;
  static greenPuzzlesSprites: PuzzlesSprites;
  static image: HTMLImageElement;

  static async reloadTheme() {
    this.buildingsSprites = new BuildingsSprites(this.image);
    this.robotSprites = new RobotSprites(this.image);
    this.infoSprites = new InfoSprites(this.image);
    this.searchablesSprites = new SearchablesSprites(this.image);
  }

  static async loadAssets() {
    const images = new Promise<void>((resolve, reject) => {
      const imgCount = 5;
      let loadedImgs = 0;
      const image = new Image();
      image.onload = () => {
        this.image = image;
        this.playerSprites = new PlayerSprites(image);
        this.buildingsSprites = new BuildingsSprites(image);
        this.robotSprites = new RobotSprites(image);
        this.infoSprites = new InfoSprites(image);
        this.searchablesSprites = new SearchablesSprites(image);
        this.elevatorCorridorSprites = new ElevatorCorridorSprites(image);
        this.pocketComputerSprites = new PocketComputerSprites(image);
        this.yellowPuzzlesSprites = new PuzzlesSprites(image, 'yellow');
        this.greenPuzzlesSprites = new PuzzlesSprites(image, 'green');
        this.bluePuzzlesSprites = new PuzzlesSprites(image, 'blue');
        loadedImgs++;

        if (imgCount === loadedImgs) resolve();
      };
      image.src = './assets/sprites/main_sprites.png';

      const terminalImgsSrcs = [
        './assets/terminal/arrow.png',
        './assets/terminal/passwordAccepted.png',
        './assets/terminal/passwordRequired.png',
        './assets/terminal/terminal.png',
      ];
      let i = 0;
      for (const src of terminalImgsSrcs) {
        const image = new Image();
        if (i === 0) this.terminalSprites.addAsset('arrow', image);
        if (i === 1) this.terminalSprites.addAsset('passwordAccepted', image);
        if (i === 2) this.terminalSprites.addAsset('passwordRequired', image);
        if (i === 3) this.terminalSprites.addAsset('terminal', image);

        image.onload = () => {
          loadedImgs++;
          if (imgCount === loadedImgs) resolve();
        };
        image.src = src;
        i++;
      }
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
