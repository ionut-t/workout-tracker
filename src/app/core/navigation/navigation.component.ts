import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  authSubscription$: Subscription;
  isOpened = false;
  isAuth = false;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authSubscription$ = this.authService.authChange$.subscribe(
      authStatus => {
        this.isAuth = authStatus;
      }
    );
  }

  onLogout() {
    this.authService.logoutUser();
  }

  ngOnDestroy() {
    if (this.authSubscription$) {
      this.authSubscription$.unsubscribe();
    }
  }
}
