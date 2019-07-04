import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { MatSidenav } from '@angular/material';

/**
 * Navigation component.
 */
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  authSubscription$: Subscription;
  isOpened = false;
  isAuth = false;
  @ViewChild('drawer') drawer: MatSidenav;

  /**
   * Angular Material observable.
   */
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService
  ) {}

  /**
   * Check if user is authenticated.
   */
  ngOnInit() {
    this.authSubscription$ = this.authService.authChange$.subscribe(
      authStatus => {
        this.isAuth = authStatus;
      }
    );
  }

  /**
   * Log out the user.
   */
  onLogout() {
    this.authService.logoutUser();
    this.drawer.close();
  }

  /**
   * Unsubscribe from authentication subscription to prevent memory leaks.
   */
  ngOnDestroy() {
    if (this.authSubscription$) {
      this.authSubscription$.unsubscribe();
    }
  }
}
