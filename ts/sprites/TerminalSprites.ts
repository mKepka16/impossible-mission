import State from '../general/State';
import Vector from '../general/Vector';

interface TerminalAssets {
  arrow: HTMLImageElement;
  passwordAccepted: HTMLImageElement;
  passwordRequired: HTMLImageElement;
  terminal: HTMLImageElement;
}

class TerminalSprites {
  assets: TerminalAssets = {
    arrow: null,
    passwordAccepted: null,
    passwordRequired: null,
    terminal: null,
  };

  addAsset(name: keyof TerminalAssets, asset: HTMLImageElement) {
    this.assets[name] = asset;
  }

  renderAsset(name: keyof TerminalAssets, position: Vector) {
    const ctx = State.canvas.ctx;
    ctx.drawImage(this.assets[name], position.x, position.y);
  }
}

export default TerminalSprites;
