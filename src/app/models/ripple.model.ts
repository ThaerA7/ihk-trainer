export class Ripple {
  x: number;
  y: number;
  radius: number;
  growth: number;
  alpha: number;

  constructor(x: number, y: number, startRadius: number, alpha: number) {
    this.x = x;
    this.y = y;
    this.radius = startRadius;
    this.growth = 1.6;
    this.alpha = alpha;
  }

  update() {
    this.radius += this.growth;
    this.alpha -= 0.015;
  }
}
