import { Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  template: `
    <div class="logo-container">
      <div class="logo-icon">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="logoRingGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#5ed6c8" />
              <stop offset="50%" stop-color="#f4c95d" />
              <stop offset="100%" stop-color="#f08c5b" />
            </linearGradient>
            <linearGradient id="logoFuseIH" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#5ed6c8" />
              <stop offset="100%" stop-color="#f4c95d" />
            </linearGradient>
            <linearGradient id="logoFuseHK" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#f4c95d" />
              <stop offset="100%" stop-color="#f08c5b" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="45" fill="none" stroke="url(#logoRingGradient)" stroke-width="3"/>
          <path d="M26 32 L26 68" stroke="#5ed6c8" stroke-width="4" fill="none" stroke-linecap="round"/>
          <path d="M38 32 L38 68" stroke="#f4c95d" stroke-width="4" fill="none" stroke-linecap="round"/>
          <path d="M50 32 L50 68" stroke="#f4c95d" stroke-width="4" fill="none" stroke-linecap="round"/>
          <path d="M38 50 L50 50" stroke="#f4c95d" stroke-width="4" fill="none" stroke-linecap="round"/>
          <path d="M62 32 L62 68" stroke="#f08c5b" stroke-width="4" fill="none" stroke-linecap="round"/>
          <path d="M62 50 L74 34" stroke="#f08c5b" stroke-width="4" fill="none" stroke-linecap="round"/>
          <path d="M62 50 L74 66" stroke="#f08c5b" stroke-width="4" fill="none" stroke-linecap="round"/>
          <path
            d="M26 50 C31 44 34 44 38 50"
            stroke="url(#logoFuseIH)"
            stroke-width="4.2"
            fill="none"
            stroke-linecap="round"
          />
          <path
            d="M50 50 C55 44 58 44 62 50"
            stroke="url(#logoFuseHK)"
            stroke-width="4.2"
            fill="none"
            stroke-linecap="round"
          />
        </svg>
      </div>
      <h1 class="logo-text">IHK Exam Trainer</h1>
      <p class="logo-subtitle">Prepare. Practice. Pass.</p>
    </div>
  `,
  styles: [`
    .logo-container {
      text-align: left;
      color: white;
    }

    .logo-icon {
      width: 120px;
      height: 120px;
      margin-bottom: 20px;
      animation: float 3s ease-in-out infinite;
    }

    .logo-icon svg {
      width: 100%;
      height: 100%;
      filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2));
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }

    .logo-text {
      font-size: 3.5rem;
      font-weight: 800;
      margin: 0;
      text-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
      line-height: 1.1;
    }

    .logo-subtitle {
      font-size: 1.4rem;
      margin: 12px 0 0 0;
      opacity: 0.95;
      font-weight: 300;
      letter-spacing: 2px;
    }

    @media (max-width: 1200px) {
      .logo-container {
        text-align: center;
      }

      .logo-icon {
        margin-left: auto;
        margin-right: auto;
      }

      .logo-text {
        font-size: 2.5rem;
      }

      .logo-subtitle {
        font-size: 1.1rem;
      }
    }
  `]
})
export class LogoComponent {}
