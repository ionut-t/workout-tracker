import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from './must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  // hide/show password
  hide = true;

  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
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

  // Getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  // Handle register form errors -> email field
  emailErrorHandler() {
    if (this.f.email.hasError('required')) {
      return 'You must enter a valid email';
    } else if (this.f.email.hasError('email')) {
      return 'This is not a valid email';
    }
    return null;
  }

  // Handle register form errors -> password field
  passwordErrorHandler() {
    if (this.f.password.hasError('required')) {
      return 'You must enter a password';
    } else if (this.f.password.hasError('minlength')) {
      return 'The password is too short. Please enter minimum 6 characters';
    }
    return null;
  }

  // Handle register form errors -> confirm-password field
  confirmPasswordErrorHandler() {
    if (this.f.confirmPassword.hasError('required')) {
      return 'You must confirm your password';
    } else if (this.f.confirmPassword.hasError('mustMatch')) {
      return 'Passwords do not match';
    }
    return null;
  }

  onSubmit() {}
}
