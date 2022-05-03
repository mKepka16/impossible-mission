import Vector from './Vector';

class Canvas {
  public canvas: HTMLCanvasElement;
  public width: number;
  public height: number;
  public ctx: CanvasRenderingContext2D;
  public fps: number;
  private oldTimeStamp: number;
  public deltaTime: number;
  // @ts-ignore
  private mouseOnCanvas: boolean;
  public mouseDown: boolean;
  public mouse: Vector;

  constructor(_canvas: HTMLCanvasElement, _width: number, _height: number) {
    // Globals
    this.canvas = _canvas;
    this.width = _width;
    this.height = _height;

    // Setting canvas
    this.canvas.height = this.height;
    this.canvas.width = this.width;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;

    // FPS Counter
    this.fps = 0;
    this.oldTimeStamp = 0;
    this.deltaTime = 0;

    // Mouse
    this.mouseOnCanvas = false;
    this.canvas.onmousemove = (e) => this.handleMouseMove(e);
    this.canvas.onmouseenter = () => (this.mouseOnCanvas = true);
    this.canvas.onmouseleave = () => (this.mouseOnCanvas = false);
    this.canvas.onmousedown = () => (this.mouseDown = true);
    this.canvas.onmouseup = () => (this.mouseDown = false);
    this.mouse = new Vector(0, 0);
    // Starting game loop
    window.requestAnimationFrame((timeStamp) => this.frame(timeStamp));
  }

  update() {}

  showFPS(color = 'white') {
    this.ctx.font = '20px c64';
    this.ctx.fillStyle = color;
    this.ctx.fillText(this.fps.toString(), this.canvas.width - 40, 20);
  }

  handleMouseMove(e: MouseEvent) {
    const canvasPosition = this.canvas.getBoundingClientRect();
    this.mouse.x = Math.ceil(e.clientX - canvasPosition.x);
    this.mouse.y = Math.ceil(e.clientY - canvasPosition.y);
  }

  frame(timeStamp: number) {
    this.deltaTime = (timeStamp - this.oldTimeStamp) / 1000;
    this.oldTimeStamp = timeStamp;
    this.fps = Math.round(1 / this.deltaTime);
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.update();
    window.requestAnimationFrame((timeStamp) => this.frame(timeStamp)); // get next frame
  }
}

export default Canvas;
