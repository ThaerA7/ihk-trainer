import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  loginWithGoogle(): void {
    console.log('Google login clicked');
    // TODO: Implement Google OAuth login
    alert('Google login will be implemented here');
  }

  loginAsGuest(): void {
    console.log('Guest login clicked');
    // TODO: Implement guest login flow
    alert('Starting as guest...');
  }
}
