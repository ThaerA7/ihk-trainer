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
          <span class="highlight">IHK&nbsp;Prüfungen</span> vor
        </h1>
        
        <p class="intro-description">
          Plattform für IT-Umschüler, die AP1 und AP2 realistisch üben wollen.<br>
          Aufgaben werden von der Community gebaut, streng moderiert freigegeben und stehen Gästen sofort zum Üben bereit.
        </p>

        <div class="features-grid">
          <!-- Card 1: Build AP1/AP2 tasks -->
          <div class="feature-card card-generate">
            <div class="art-background">
              <svg class="art-illustration" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                <!-- Abstract code/document creation illustration -->
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#667eea;stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:#764ba2;stop-opacity:0.9" />
                  </linearGradient>
                  <filter id="glow1">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <!-- Brush strokes -->
                <path d="M50,150 Q100,100 150,120 T250,150 T350,140" stroke="#8b5cf6" stroke-width="25" fill="none" opacity="0.3" stroke-linecap="round"/>
                <path d="M80,200 Q130,180 180,200 T280,210" stroke="#ec4899" stroke-width="20" fill="none" opacity="0.4" stroke-linecap="round"/>
                <!-- Document shapes -->
                <rect x="120" y="80" width="100" height="120" rx="8" fill="url(#grad1)" opacity="0.6" filter="url(#glow1)"/>
                <rect x="180" y="100" width="100" height="120" rx="8" fill="#a855f7" opacity="0.5" filter="url(#glow1)"/>
                <!-- Floating elements -->
                <circle cx="80" cy="100" r="15" fill="#fbbf24" opacity="0.6"/>
                <circle cx="300" cy="180" r="20" fill="#60a5fa" opacity="0.5"/>
                <path d="M250,60 L270,80 L250,100 L230,80 Z" fill="#fb923c" opacity="0.7"/>
              </svg>
            </div>
            <div class="card-content">
              <div class="card-header">
                <div class="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
                  </svg>
                </div>
                <h3>AP1/AP2-Aufgaben bauen</h3>
              </div>
              <p>Baue Aufgaben im echten IHK-Format inklusive Erwartungshorizont, Musterlösung und Punktelogik — wahlweise rein manuell oder mit KI-Unterstützung.</p>
              <div class="card-badge">Registriert + KI optional</div>
            </div>
          </div>

          <!-- Card 2: Mod review & release -->
          <div class="feature-card card-review">
            <div class="art-background">
              <svg class="art-illustration" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#f093fb;stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:#f5576c;stop-opacity:0.9" />
                  </linearGradient>
                  <filter id="glow2">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <!-- Checkmark abstract art -->
                <path d="M50,120 Q100,180 150,140 Q200,100 280,60" stroke="#fbbf24" stroke-width="30" fill="none" opacity="0.4" stroke-linecap="round"/>
                <path d="M70,100 L120,160 L320,40" stroke="#ef4444" stroke-width="22" fill="none" opacity="0.5" stroke-linecap="round" stroke-linejoin="round"/>
                <!-- Stars/approval symbols -->
                <circle cx="250" cy="180" r="25" fill="url(#grad2)" opacity="0.6" filter="url(#glow2)"/>
                <circle cx="100" cy="220" r="18" fill="#fbbf24" opacity="0.7"/>
                <polygon points="350,140 360,165 385,170 367,188 372,213 350,200 328,213 333,188 315,170 340,165" fill="#fb923c" opacity="0.6"/>
              </svg>
            </div>
            <div class="card-content">
              <div class="card-header">
                <div class="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M9 11l3 3L22 4"></path>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                  </svg>
                </div>
                <h3>Mod-Check & Freigabe</h3>
              </div>
              <p>Moderatoren prüfen jede Aufgabe auf Fachlichkeit, Verständlichkeit, Punktevergabe und Copyright-Compliance, bevor sie für alle sichtbar wird. Qualität steht an erster Stelle.</p>
              <div class="card-badge">Pflicht vor Livegang</div>
            </div>
          </div>

          <!-- Card 3: Catalog & guides -->
          <div class="feature-card card-catalog">
            <div class="art-background">
              <svg class="art-illustration" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#4facfe;stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:#00f2fe;stop-opacity:0.9" />
                  </linearGradient>
                </defs>
                <!-- Book pages abstract -->
                <rect x="80" y="60" width="120" height="160" rx="10" fill="#06b6d4" opacity="0.4" transform="rotate(-8 140 140)"/>
                <rect x="120" y="70" width="120" height="160" rx="10" fill="#0ea5e9" opacity="0.5" transform="rotate(-4 180 150)"/>
                <rect x="160" y="80" width="120" height="160" rx="10" fill="url(#grad3)" opacity="0.6"/>
                <!-- Floating knowledge symbols -->
                <circle cx="90" cy="200" r="12" fill="#3b82f6" opacity="0.6"/>
                <circle cx="300" cy="120" r="16" fill="#06b6d4" opacity="0.5"/>
                <path d="M250,200 L270,220 L290,200 L270,180 Z" fill="#0ea5e9" opacity="0.7"/>
                <!-- Lines representing text -->
                <line x1="175" y1="110" x2="255" y2="110" stroke="white" stroke-width="3" opacity="0.6"/>
                <line x1="175" y1="130" x2="265" y2="130" stroke="white" stroke-width="3" opacity="0.6"/>
                <line x1="175" y1="150" x2="245" y2="150" stroke="white" stroke-width="3" opacity="0.6"/>
              </svg>
            </div>
            <div class="card-content">
              <div class="card-header">
                <div class="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                  </svg>
                </div>
                <h3>Themenkatalog & Leitfäden</h3>
              </div>
              <p>Alle prüfungsrelevanten Bereiche für IT-Umschüler: Schwerpunktlisten, Beispielaufgaben, Erwartungshorizonte und Lernpfade für AP1 und AP2. Perfekt strukturiert und didaktisch aufbereitet.</p>
              <div class="card-badge">Katalog AP1/AP2</div>
            </div>
          </div>

          <!-- Card 4: Practice access -->
          <div class="feature-card card-practice">
            <div class="art-background">
              <svg class="art-illustration" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#43e97b;stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:#38f9d7;stop-opacity:0.9" />
                  </linearGradient>
                </defs>
                <!-- Target/practice abstract -->
                <circle cx="200" cy="150" r="80" fill="none" stroke="#10b981" stroke-width="15" opacity="0.3"/>
                <circle cx="200" cy="150" r="55" fill="none" stroke="#14b8a6" stroke-width="12" opacity="0.4"/>
                <circle cx="200" cy="150" r="30" fill="url(#grad4)" opacity="0.6"/>
                <!-- Growth arrows -->
                <path d="M100,200 Q150,120 200,150" stroke="#22c55e" stroke-width="18" fill="none" opacity="0.4" stroke-linecap="round"/>
                <path d="M200,150 Q250,100 300,130" stroke="#10b981" stroke-width="18" fill="none" opacity="0.4" stroke-linecap="round"/>
                <!-- Achievement stars -->
                <polygon points="80,80 88,100 108,104 94,118 98,138 80,128 62,138 66,118 52,104 72,100" fill="#fbbf24" opacity="0.7"/>
                <polygon points="320,200 328,220 348,224 334,238 338,258 320,248 302,258 306,238 292,224 312,220" fill="#fb923c" opacity="0.6"/>
              </svg>
            </div>
            <div class="card-content">
              <div class="card-header">
                <div class="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 6v6l4 2"></path>
                  </svg>
                </div>
                <h3>Üben, einreichen, verbessern</h3>
              </div>
              <p>Gäste üben alle freigegebenen Sets anonym. Registrierte erstellen eigene Aufgaben, posten Lösungen, bekommen Feedback und sehen ihren Fortschritt.</p>
              <div class="card-badge">Gast & Registriert</div>
            </div>
          </div>

          <!-- Card 5: Fair use / anti abuse -->
          <div class="feature-card card-protection">
            <div class="art-background">
              <svg class="art-illustration" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="grad6" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#667eea;stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:#764ba2;stop-opacity:0.9" />
                  </linearGradient>
                  <filter id="glow6">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <!-- Shield abstract art -->
                <path d="M200,50 L280,90 L280,180 Q280,220 200,250 Q120,220 120,180 L120,90 Z" fill="url(#grad6)" opacity="0.6" filter="url(#glow6)"/>
                <path d="M200,70 L260,100 L260,170 Q260,200 200,225 Q140,200 140,170 L140,100 Z" fill="#8b5cf6" opacity="0.5"/>
                <!-- Protection symbols -->
                <circle cx="200" cy="150" r="35" fill="#a855f7" opacity="0.6"/>
                <path d="M185,150 L195,160 L215,140" stroke="white" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.9"/>
                <!-- Decorative elements -->
                <circle cx="80" cy="100" r="15" fill="#c084fc" opacity="0.6"/>
                <circle cx="320" cy="200" r="18" fill="#8b5cf6" opacity="0.6"/>
                <polygon points="340,80 350,95 365,100 350,105 340,120 330,105 315,100 330,95" fill="#a855f7" opacity="0.7"/>
              </svg>
            </div>
            <div class="card-content">
              <div class="card-header">
                <div class="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h3>Fair Use & Anti-Troll</h3>
              </div>
              <p>Keine Original-IHK-Aufgaben, sondern nur Simulationen. Spam, Trolling oder Copy-Paste-Content werden gesperrt; Täter werden vom Einsenden ausgeschlossen.</p>
              <div class="card-badge">Schutz & Vertrauen</div>
            </div>
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
            <strong>Wichtig:</strong> Keine Original-IHK-Aufgaben (Urheberrecht), nur Simulationen aus der Community. 
            Spam/Troll-Einsendungen werden geblockt, Wiederholungstäter vom Einreichen ausgeschlossen.
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
      padding: 12px 20px;
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
      padding: 16px 10px;
    }

    .intro-section {
      max-width: 1400px;
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
      line-height: 1.3; /* increase to avoid descender clipping */
      margin: 0 0 24px 0;
      overflow: visible; /* ensure glyphs render fully */
      text-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    }

    .highlight {
      background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      display: inline; /* inline to preserve descenders */
      padding-bottom: 0.05em; /* tiny breathing room for descenders */
      white-space: nowrap; /* keep words together */
    }

    .intro-description {
      font-size: 1.2rem;
      line-height: 1.6;
      margin: 0 auto 48px;
      max-width: 1000px;
      opacity: 0.95;
      font-weight: 500;
      letter-spacing: 0.2px;
      text-align: center;
    }

    /* Features Grid */
    .features-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(460px, 1fr));
      gap: 16px;
      margin: 32px 0;
      text-align: left;
      justify-items: stretch;
    }

    .feature-card:nth-child(5) {
      grid-column: 1 / -1;
      max-width: 640px;
      justify-self: center;
      width: 100%;
    }

    .feature-card {
      position: relative;
      border-radius: 40px;
      padding: 0;
      overflow: hidden;
      transition: transform 0.4s ease, box-shadow 0.4s ease;
      cursor: pointer;
      height: 320px;
      box-shadow: 
        0 12px 24px rgba(0, 0, 0, 0.25), 
        0 6px 12px rgba(0, 0, 0, 0.15),
        inset 0 0 0 4px rgba(255, 255, 255, 0.9);
      pointer-events: auto;
      will-change: transform, box-shadow;
      backface-visibility: hidden;
      -webkit-font-smoothing: subpixel-antialiased;
    }

    .feature-card:hover {
      transform: translateY(-12px);
      box-shadow: 
        0 28px 56px rgba(0, 0, 0, 0.4), 
        0 8px 16px rgba(0, 0, 0, 0.2),
        inset 0 0 0 4px rgba(255, 255, 255, 0.6);
    }

    .art-background {
      position: absolute;
      inset: 0;
      overflow: hidden;
      z-index: 1;
    }

    .art-illustration {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0.85;
      transition: opacity 0.4s ease, transform 0.4s ease;
      overflow: visible;
      pointer-events: none;
      filter: saturate(1.15) brightness(1.05);
    }

    .feature-card:hover .art-illustration {
      opacity: 1;
      transform: scale(1.05);
    }

    .card-content {
      position: relative;
      z-index: 4;
      padding: 28px;
      height: 100%;
      display: flex;
      flex-direction: column;
      background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 100%);
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 16px;
    }

    .feature-icon {
      width: 64px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: transform 0.3s ease;
    }

    .feature-card:hover .feature-icon {
      transform: translateY(-4px);
    }

    .feature-icon svg {
      width: 56px;
      height: 56px;
      stroke-width: 2;
      color: white;
      filter: drop-shadow(0 3px 8px rgba(0, 0, 0, 0.4));
    }

    .feature-card h3 {
      font-size: 1.6rem;
      font-weight: 900;
      margin: 0;
      color: white;
      text-shadow: 
        0 3px 10px rgba(0, 0, 0, 0.7),
        0 2px 4px rgba(0, 0, 0, 0.5),
        -2px 2px 0 rgba(0, 0, 0, 0.3);
      letter-spacing: 0.3px;
      line-height: 1.3;
    }

    .feature-card:hover h3 {
      /* No transform to keep text crisp */
    }

    .feature-card p {
      margin: 0 0 auto 0;
      color: rgba(255, 255, 255, 0.98);
      line-height: 1.8;
      font-size: 1.1rem;
      text-shadow: 
        0 2px 6px rgba(0, 0, 0, 0.5),
        0 1px 2px rgba(0, 0, 0, 0.3);
      font-weight: 500;
      padding-bottom: 16px;
    }

    .feature-card:hover p {
      color: rgba(255, 255, 255, 1);
    }

    .card-badge {
      display: inline-block;
      padding: 10px 18px;
      background: rgba(255, 255, 255, 0.3);
      backdrop-filter: blur(10px);
      border-radius: 24px;
      font-size: 0.75rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      margin-top: 12px;
      align-self: flex-start;
      border: 3px solid rgba(255, 255, 255, 0.4);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.3);
      transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
      color: white;
      font-style: italic;
    }

    .feature-card:hover .card-badge {
      background: rgba(255, 255, 255, 0.4);
      border-color: rgba(255, 255, 255, 0.6);
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.4);
    }

    /* Individual Card Themes */
    .card-generate {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .card-review {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    }

    .card-catalog {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    }

    .card-practice {
      background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
    }

    .card-ai {
      background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
    }

    .card-protection {
      background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
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
        padding: 10px 14px;
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
        gap: 18px;
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
