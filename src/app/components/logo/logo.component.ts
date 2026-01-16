import { Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  template: `
    <div class="logo-container">
      <div class="logo-icon">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" stroke-width="3"/>
          <path d="M 30 35 L 30 65 M 45 35 L 45 65 M 45 50 L 60 35 M 60 35 L 60 65 M 60 50 L 70 35 L 70 65" 
                stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
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
