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
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(10px);
      border-radius: 24px;
      padding: 48px 40px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      width: 420px;
      max-width: 90vw;
    }

    .login-card h2 {
      margin: 0 0 8px 0;
      font-size: 2rem;
      color: #2d3748;
      font-weight: 700;
    }

    .login-subtitle {
      margin: 0 0 32px 0;
      color: #718096;
      font-size: 0.95rem;
    }

    .login-buttons {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      padding: 14px 24px;
      border: none;
      border-radius: 12px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      width: 100%;
    }

    .btn-icon {
      width: 20px;
      height: 20px;
    }

    .btn-google {
      background: white;
      color: #2d3748;
      border: 2px solid #e2e8f0;
    }

    .btn-google:hover {
      background: #f7fafc;
      border-color: #cbd5e0;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .btn-guest {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .btn-guest:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
    }

    .divider {
      display: flex;
      align-items: center;
      text-align: center;
      color: #a0aec0;
      margin: 8px 0;
    }

    .divider::before,
    .divider::after {
      content: '';
      flex: 1;
      border-bottom: 1px solid #e2e8f0;
    }

    .divider span {
      padding: 0 16px;
      font-size: 0.875rem;
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
