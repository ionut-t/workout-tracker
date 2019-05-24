import { Injectable } from '@angular/core';
import { CanLoad, Router, Route } from '@angular/router';
import { AuthService } from './auth.service';

/**
 * Guard for route protection
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Runs before the bundle is loaded
   * Check if the user has permissions to access a protected route and before bundle is loaded
   * Return true if his authenticated otherwise is redirected to the login page
   */
  canLoad(route: Route) {
    if (this.authService.isAuth()) {
      return true;
    }

    this.router.navigate(['/login']);
  }
}
