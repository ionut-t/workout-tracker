import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  // Send reset password email and display firebase errors
  onResetPassword(email: string) {
    this.authService.sendPasswordResetEmail(email).catch(error => {
      this.authService.firebaseErrorHandler(error);
    });
  }
}
