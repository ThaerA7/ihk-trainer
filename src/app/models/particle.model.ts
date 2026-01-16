export class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  gravity = 0.1;

  constructor(x: number, y: number, vx: number, vy: number, size: number) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.size = size;
    this.maxLife = 100;
    this.life = this.maxLife;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.life -= 1.5;
  }
}
