export interface IRenderableOnCamera {
  update?: (dt: number, g: number, f: number, cameraY: number) => void; // deltatime, gravity, friction
  render: (dt: number, cameraY: number) => void;
}
