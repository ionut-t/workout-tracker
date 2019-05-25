import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from './must-match.validator';
import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';
import { Subscription } from 'rxjs';

/**
 * Component for registering user
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  /**
   * Toggle display password
   */
  hide = true;

  registerForm: FormGroup;
  private loadingSubscription$: Subscription;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private uiService: UIService
  ) {}

  /**
   * Subscribe to the event emitter.
   * It will trigger whenever the loading state is changing.
   * Create and validate the reactive register form.
   */
  ngOnInit() {
    this.loadingSubscription$ = this.uiService.loadingStateChanged$.subscribe(
      isLoading => (this.isLoading = isLoading)
    );
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      {
        validator: MustMatch('password', 'confirmPassword')
      }
    );
  }

  /**
   *  Getter for easy access to form fields.
   */
  get f() {
    return this.registerForm.controls;
  }

  /**
   * Handle register form errors -> email field.
   */
  emailErrorHandler() {
    if (this.f.email.hasError('required')) {
      return 'You must enter a valid email';
    } else if (this.f.email.hasError('email')) {
      return 'This is not a valid email';
    }
    return null;
  }

  /**
   * Handle register form errors -> password field.
   */
  passwordErrorHandler() {
    if (this.f.password.hasError('required')) {
      return 'You must enter a password';
    } else if (this.f.password.hasError('minlength')) {
      return 'The password is too short. Please enter minimum 6 characters';
    }
    return null;
  }

  /**
   * Handle register form errors -> confirm-password field.
   */
  confirmPasswordErrorHandler() {
    if (this.f.confirmPassword.hasError('required')) {
      return 'You must confirm your password';
    } else if (this.f.confirmPassword.hasError('mustMatch')) {
      return 'Passwords do not match';
    }
    return null;
  }

  /**
   * Register the user.
   */
  onSubmit() {
    this.authService.registerUser({
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    });
  }

  /**
   * Unsubscribe from the loading subscription to prevent memory leaks.
   */
  ngOnDestroy() {
    if (this.loadingSubscription$) {
      this.loadingSubscription$.unsubscribe();
    }
  }
}
