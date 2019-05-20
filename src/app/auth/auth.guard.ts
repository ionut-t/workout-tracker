import { Injectable } from '@angular/core';
import { CanLoad, Router, Route } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(route: Route) {
    if (this.authService.isAuth()) {
      return true;
    }

    this.router.navigate(['/login']);
  }
}
