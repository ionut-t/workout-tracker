import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // hide/show password
  hide = true;

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  // Handle login form errors -> email
  emailErrorHandler() {
    if (this.f.email.hasError('required')) {
      return 'You must enter your email';
    } else if (this.f.email.hasError('email')) {
      return 'Enter a valid email';
    }
    return null;
  }
  // Handle login form errors -> password
  passwordErrorHandler() {
    if (this.f.password.hasError('required')) {
      return 'Password is not correct';
    } else {
      return null;
    }
  }

  onSubmit() {}
}
