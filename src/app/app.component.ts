import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <canvas #waterCanvas class="water-canvas"></canvas>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100vh;
      overflow: hidden;
    }

    .water-canvas {
      display: block;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
  `]
})
export class AppComponent implements OnInit {
  @ViewChild('waterCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private width = 0;
  private height = 0;
  private particles: Particle[] = [];
  private animationId: number | null = null;

  ngOnInit() {
    this.initCanvas();
    this.animate();
  }

  private initCanvas() {
    this.canvas = this.canvasRef.nativeElement;
    const ctx = this.canvas.getContext('2d');
    if (!ctx) return;

    this.ctx = ctx;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  @HostListener('window:resize')
  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.createParticles(event.clientX, event.clientY, false);
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    this.createParticles(event.clientX, event.clientY, true);
  }

  private createParticles(x: number, y: number, isClick: boolean) {
    const count = isClick ? 20 : 3;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const velocity = isClick ? 4 : 2;
      this.particles.push(
        new Particle(
          x,
          y,
          Math.cos(angle) * velocity,
          Math.sin(angle) * velocity,
          isClick ? 8 : 4
        )
      );
    }
  }

  private animate = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      particle.update();

      if (particle.life <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.life / particle.maxLife})`;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
    }

    this.animationId = requestAnimationFrame(this.animate);
  };

  ngOnDestroy() {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

class Particle {
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
