import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login-card',
  standalone: true,
  template: `
    <div class="login-card">
      <h2>Welcome Back</h2>
      <p class="login-subtitle">Sign in to continue your learning journey</p>
      
      <div class="login-buttons">
        <button class="btn btn-google" (click)="onGoogleLogin()">
          <svg class="btn-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>
        
        <div class="divider">
          <span>or</span>
        </div>
        
        <button class="btn btn-guest" (click)="onGuestLogin()">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          Continue as Guest
        </button>
      </div>
    </div>
  `,
  styles: [`
    .login-card {
      background: rgba(255, 255, 255, 0.99);
      backdrop-filter: blur(10px);
      border-radius: 40px;
      padding: 48px 40px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25), 0 10px 30px rgba(0, 0, 0, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.5);
      width: 420px;
      max-width: 90vw;
      border: 4px solid rgba(15, 76, 92, 0.2);
      position: relative;
      overflow: hidden;
    }

    .login-card::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -30%;
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba(15, 76, 92, 0.12) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
    }

    .login-card::after {
      content: '';
      position: absolute;
      bottom: -40%;
      left: -20%;
      width: 200px;
      height: 200px;
      background: radial-gradient(circle, rgba(240, 140, 91, 0.12) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
    }

    .login-card h2 {
      margin: 0 0 8px 0;
      font-size: 2.2rem;
      color: #2d3748;
      font-weight: 900;
      letter-spacing: -0.5px;
      position: relative;
      z-index: 1;
    }

    .login-subtitle {
      margin: 0 0 32px 0;
      color: #718096;
      font-size: 1rem;
      font-weight: 500;
      position: relative;
      z-index: 1;
    }

    .login-buttons {
      display: flex;
      flex-direction: column;
      gap: 16px;
      position: relative;
      z-index: 1;
    }

    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      padding: 16px 24px;
      border: none;
      border-radius: 24px;
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      width: 100%;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.3);
      border: 3px solid transparent;
    }

    .btn-icon {
      width: 22px;
      height: 22px;
    }

    .btn-google {
      background: white;
      color: #2d3748;
      border: 3px solid #e2e8f0;
    }

    .btn-google:hover {
      background: #f7fafc;
      border-color: #2c7a7b;
      transform: translateY(-4px) scale(1.02);
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.4);
    }

    .btn-google:active {
      transform: translateY(-2px) scale(1.01);
    }

    .btn-guest {
      background: linear-gradient(135deg, #0f4c5c 0%, #2c7a7b 100%);
      color: white;
      border: 3px solid rgba(255, 255, 255, 0.3);
    }

    .btn-guest:hover {
      transform: translateY(-4px) scale(1.02);
      box-shadow: 0 16px 32px rgba(15, 76, 92, 0.45), inset 0 1px 2px rgba(255, 255, 255, 0.3);
      border-color: rgba(255, 255, 255, 0.5);
    }

    .btn-guest:active {
      transform: translateY(-2px) scale(1.01);
    }

    .divider {
      display: flex;
      align-items: center;
      text-align: center;
      color: #a0aec0;
      margin: 12px 0;
      position: relative;
      z-index: 1;
    }

    .divider::before,
    .divider::after {
      content: '';
      flex: 1;
      border-bottom: 2px solid #e2e8f0;
    }

    .divider span {
      padding: 0 16px;
      font-size: 0.875rem;
      font-weight: 600;
    }
  `]
})
export class LoginCardComponent {
  @Output() googleLogin = new EventEmitter<void>();
  @Output() guestLogin = new EventEmitter<void>();

  onGoogleLogin() {
    this.googleLogin.emit();
  }

  onGuestLogin() {
    this.guestLogin.emit();
  }
}
