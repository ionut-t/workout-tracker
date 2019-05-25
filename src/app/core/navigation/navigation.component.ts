import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

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
