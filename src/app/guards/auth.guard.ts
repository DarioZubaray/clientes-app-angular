import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService, public router: Router) {}

  canActivate(): boolean {
    if (this._authService.isAuthenticated()) {
      if (this.isTokenExpirado()) {
        this._authService.logout();
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  isTokenExpirado(): boolean {
    let token = this._authService.token;
    let payload = this._authService.obtenerPayload(token);
    let now = new Date().getTime() / 1000;
    return (payload.exp < now);
  }
}
