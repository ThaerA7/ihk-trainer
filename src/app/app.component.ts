import { Component, OnDestroy, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './components/logo/logo.component';
import { LoginCardComponent } from './components/login-card/login-card.component';
import { AuthService } from './services/auth.service';
import { Particle } from './models/particle.model';
import { Ripple } from './models/ripple.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LogoComponent, LoginCardComponent],
  template: `
    <canvas #waterCanvas class="water-canvas"></canvas>
    
    <!-- Header -->
    <header class="header">
      <div class="logo-compact">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" stroke-width="3"/>
          <path d="M 30 35 L 30 65 M 45 35 L 45 65 M 45 50 L 60 35 M 60 35 L 60 65 M 60 50 L 70 35 L 70 65" 
                stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>IHK Trainer</span>
      </div>
      <button class="login-btn" (click)="showLoginDialog = true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
          <polyline points="10 17 15 12 10 7"></polyline>
          <line x1="15" y1="12" x2="3" y2="12"></line>
        </svg>
        Login
      </button>
    </header>

    <!-- Main Content -->
    <div class="main-content">
      <div class="intro-section">
        <div class="intro-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
            <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
          </svg>
          IT Umschüler Prüfungsvorbereitung
        </div>
        
        <h1 class="intro-title">
          Bereite dich optimal auf deine
          <span class="highlight">IHK Prüfungen</span> vor
        </h1>
        
        <p class="intro-description">
          Die perfekte Plattform für IT-Umschüler zur Vorbereitung auf die AP1 und AP2 IHK-Prüfungen. 
          Übe mit realistischen Aufgaben, die von der Community erstellt und von Moderatoren geprüft wurden.
        </p>

        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <h3>Praxisnahe Aufgaben</h3>
            <p>Simuliere echte IHK-Prüfungsaufgaben, erstellt von Umschülern für Umschüler</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 11l3 3L22 4"></path>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
              </svg>
            </div>
            <h3>Qualitätskontrolle</h3>
            <p>Jede Aufgabe wird von erfahrenen Moderatoren überprüft und freigegeben</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
            </div>
            <h3>Themenkatalog</h3>
            <p>Umfassender Leitfaden zu allen prüfungsrelevanten Themen</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3>Community-gestützt</h3>
            <p>Registrierte Nutzer können eigene Aufgaben beitragen, Gäste können üben</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
            </div>
            <h3>KI-Unterstützung</h3>
            <p>Nutze KI als Hilfe beim Erstellen qualitativ hochwertiger Aufgaben</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h3>Faire Nutzung</h3>
            <p>Spam und unangemessene Inhalte werden konsequent unterbunden</p>
          </div>
        </div>

        <div class="cta-section">
          <button class="cta-button primary" (click)="showLoginDialog = true">
            Jetzt loslegen
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
          <button class="cta-button secondary" (click)="showLoginDialog = true">
            Als Gast üben
          </button>
        </div>

        <div class="info-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <p>
            <strong>Wichtig:</strong> Diese Plattform enthält keine Original-IHK-Aufgaben (Urheberrecht). 
            Alle Aufgaben sind von der Community erstellt und simulieren das Prüfungsformat.
          </p>
        </div>
      </div>
    </div>

    <!-- Login Dialog -->
    <div class="dialog-overlay" *ngIf="showLoginDialog" (click)="showLoginDialog = false">
      <div class="dialog-content" (click)="$event.stopPropagation()">
        <button class="close-btn" (click)="showLoginDialog = false">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <app-login-card 
          (googleLogin)="handleGoogleLogin()"
          (guestLogin)="handleGuestLogin()" />
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      min-height: 100vh;
    }

    .water-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      z-index: 0;
    }

    /* Header */
    .header {
      position: relative;
      z-index: 10;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px 48px;
      color: white;
    }

    .logo-compact {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 1.5rem;
      font-weight: 700;
      cursor: pointer;
      transition: transform 0.2s;
    }

    .logo-compact:hover {
      transform: scale(1.05);
    }

    .logo-compact svg {
      width: 48px;
      height: 48px;
      filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2));
    }

    .login-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 12px;
      color: white;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }

    .login-btn svg {
      width: 20px;
      height: 20px;
    }

    .login-btn:hover {
      background: rgba(255, 255, 255, 0.3);
      border-color: rgba(255, 255, 255, 0.5);
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    }

    /* Main Content */
    .main-content {
      position: relative;
      z-index: 5;
      min-height: calc(100vh - 96px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 48px 24px;
    }

    .intro-section {
      max-width: 1200px;
      width: 100%;
      text-align: center;
      color: white;
    }

    .intro-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 20px;
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
      border-radius: 50px;
      font-size: 0.9rem;
      font-weight: 500;
      margin-bottom: 24px;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .intro-badge svg {
      width: 20px;
      height: 20px;
    }

    .intro-title {
      font-size: 3.5rem;
      font-weight: 800;
      line-height: 1.2;
      margin: 0 0 24px 0;
      text-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    }

    .highlight {
      background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      display: inline-block;
    }

    .intro-description {
      font-size: 1.25rem;
      line-height: 1.8;
      margin: 0 auto 48px;
      max-width: 800px;
      opacity: 0.95;
      font-weight: 300;
    }

    /* Features Grid */
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 24px;
      margin: 48px 0;
      text-align: left;
    }

    .feature-card {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 16px;
      padding: 32px;
      transition: all 0.3s;
    }

    .feature-card:hover {
      background: rgba(255, 255, 255, 0.15);
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    }

    .feature-icon {
      width: 56px;
      height: 56px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
    }

    .feature-icon svg {
      width: 28px;
      height: 28px;
    }

    .feature-card h3 {
      font-size: 1.25rem;
      font-weight: 700;
      margin: 0 0 12px 0;
    }

    .feature-card p {
      margin: 0;
      opacity: 0.9;
      line-height: 1.6;
    }

    /* CTA Section */
    .cta-section {
      display: flex;
      gap: 16px;
      justify-content: center;
      margin: 48px 0;
    }

    .cta-button {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 32px;
      font-size: 1.1rem;
      font-weight: 600;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s;
      border: none;
    }

    .cta-button svg {
      width: 20px;
      height: 20px;
    }

    .cta-button.primary {
      background: white;
      color: #667eea;
    }

    .cta-button.primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(255, 255, 255, 0.3);
    }

    .cta-button.secondary {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: 2px solid rgba(255, 255, 255, 0.4);
    }

    .cta-button.secondary:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
    }

    /* Info Box */
    .info-box {
      display: flex;
      gap: 16px;
      align-items: flex-start;
      background: rgba(255, 215, 0, 0.15);
      border: 2px solid rgba(255, 215, 0, 0.4);
      border-radius: 12px;
      padding: 20px 24px;
      margin: 48px auto 0;
      max-width: 800px;
      text-align: left;
    }

    .info-box svg {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      color: #ffd700;
    }

    .info-box p {
      margin: 0;
      line-height: 1.6;
    }

    /* Dialog */
    .dialog-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(8px);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.2s;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .dialog-content {
      position: relative;
      animation: slideUp 0.3s;
    }

    @keyframes slideUp {
      from { 
        opacity: 0;
        transform: translateY(20px);
      }
      to { 
        opacity: 1;
        transform: translateY(0);
      }
    }

    .close-btn {
      position: absolute;
      top: -12px;
      right: -12px;
      width: 36px;
      height: 36px;
      background: white;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      transition: all 0.2s;
      z-index: 1;
    }

    .close-btn svg {
      width: 20px;
      height: 20px;
      color: #2d3748;
    }

    .close-btn:hover {
      background: #f7fafc;
      transform: scale(1.1);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .header {
        padding: 16px 24px;
      }

      .logo-compact {
        font-size: 1.2rem;
      }

      .logo-compact svg {
        width: 36px;
        height: 36px;
      }

      .login-btn {
        padding: 10px 16px;
        font-size: 0.9rem;
      }

      .intro-title {
        font-size: 2.5rem;
      }

      .intro-description {
        font-size: 1.1rem;
      }

      .features-grid {
        grid-template-columns: 1fr;
      }

      .cta-section {
        flex-direction: column;
      }

      .cta-button {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('waterCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private width = 0;
  private height = 0;
  private particles: Particle[] = [];
  private ripples: Ripple[] = [];
  private animationId: number | null = null;
  private time = 0;
  private mouse = { x: 0, y: 0 };
  private lastEffectPos = { x: 0, y: 0 };
  
  showLoginDialog = false;

  constructor(private authService: AuthService) {}

  ngAfterViewInit() {
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

    this.mouse.x = this.width / 2;
    this.mouse.y = this.height / 2;
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
    this.mouse.x = event.clientX;
    this.mouse.y = event.clientY;
    
    // Only create effects every 25 pixels of movement
    const dx = event.clientX - this.lastEffectPos.x;
    const dy = event.clientY - this.lastEffectPos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 25) {
      this.createParticles(event.clientX, event.clientY, false);
      this.createRipple(event.clientX, event.clientY, false);
      this.lastEffectPos.x = event.clientX;
      this.lastEffectPos.y = event.clientY;
    }
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    this.createParticles(event.clientX, event.clientY, true);
    this.createRipple(event.clientX, event.clientY, true);
  }

  private createParticles(x: number, y: number, isClick: boolean) {
    const count = isClick ? 28 : 3;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = isClick ? 4 + Math.random() * 2 : 1 + Math.random() * 0.5;
      this.particles.push(new Particle(x, y, Math.cos(angle) * velocity, Math.sin(angle) * velocity, isClick ? 8 : 3));
    }
  }

  private createRipple(x: number, y: number, isClick: boolean) {
    const baseRadius = Math.min(this.width, this.height) * (isClick ? 0.05 : 0.015);
    this.ripples.push(new Ripple(x, y, baseRadius, isClick ? 0.9 : 0.3));
  }

  private animate = () => {
    this.time += 0.01;
    this.drawBackground();
    this.drawRipples();

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

  handleGoogleLogin() {
    this.showLoginDialog = false;
    this.authService.loginWithGoogle();
  }

  handleGuestLogin() {
    this.showLoginDialog = false;
    this.authService.loginAsGuest();
  }

  private drawBackground() {
    const gradient = this.ctx.createLinearGradient(0, 0, this.width, this.height);
    const hueBase = 280 + Math.sin(this.time * 0.6) * 12;
    gradient.addColorStop(0, `hsl(${hueBase}, 70%, 55%)`);
    gradient.addColorStop(1, `hsl(${hueBase - 50}, 75%, 50%)`);
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Subtle moving mist
    this.ctx.save();
    this.ctx.globalAlpha = 0.18;
    this.ctx.fillStyle = '#ffffff';
    const waveY = Math.sin(this.time) * 40 + this.height * 0.35;
    this.ctx.beginPath();
    this.ctx.moveTo(0, waveY);
    for (let x = 0; x <= this.width; x += 24) {
      const y = waveY + Math.sin(this.time * 1.2 + x * 0.01) * 32;
      this.ctx.lineTo(x, y);
    }
    this.ctx.lineTo(this.width, this.height);
    this.ctx.lineTo(0, this.height);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.restore();
  }

  private drawRipples() {
    for (let i = this.ripples.length - 1; i >= 0; i--) {
      const ripple = this.ripples[i];
      ripple.update();
      if (ripple.alpha <= 0) {
        this.ripples.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.alpha * 0.6})`;
      this.ctx.lineWidth = 1.5;
      this.ctx.beginPath();
      this.ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
      this.ctx.stroke();
      this.ctx.restore();
    }
  }
}
