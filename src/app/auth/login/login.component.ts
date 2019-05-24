import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { MatDialog } from '@angular/material';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

/**
 * Component for logging user
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  /**
   * Toggle display password
   */
  hide = true;

  loginForm: FormGroup;
  loadingSubscription$: Subscription;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private uiService: UIService,
    private dialog: MatDialog
  ) {}

  /**
   * Subscribe to the event emitter -> will trigger whenever the loading state is changing
   * Create and validate the reactive login form
   */
  ngOnInit() {
    this.loadingSubscription$ = this.uiService.loadingStateChanged$.subscribe(
      isLoading => (this.isLoading = isLoading)
    );

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  /**
   * Getter for easy access to form fields
   */
  get f() {
    return this.loginForm.controls;
  }

  /**
   *  Handle login form errors -> email
   */
  emailErrorHandler() {
    if (this.f.email.hasError('required')) {
      return 'Please enter your email';
    } else if (this.f.email.hasError('email')) {
      return 'Please enter a valid email';
    }
    return null;
  }

  /**
   * Handle login form errors -> password
   */
  passwordErrorHandler() {
    if (this.f.password.hasError('required')) {
      return 'Please enter your password';
    }
    return null;
  }

  /**
   * Log in the user
   */
  onSubmit() {
    this.authService.loginUser({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }

  /**
   * Open the forgot password dialog
   */
  onForgotPassword() {
    this.dialog.open(ResetPasswordComponent);
  }

  /**
   * Unsubscribe from the loading subscription to prevent memory leaks
   */
  ngOnDestroy() {
    if (this.loadingSubscription$) {
      this.loadingSubscription$.unsubscribe();
    }
  }
}
