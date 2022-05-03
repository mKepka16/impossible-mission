export interface IRenderable {
  update?: (dt: number, g: number, f: number) => void; // deltatime, gravity, friction
  render: (dt: number) => void;
}
