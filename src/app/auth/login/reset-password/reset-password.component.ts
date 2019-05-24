import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../../auth.service';

/**
 * Component invoked programmatically for password reset dialog
 */
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

  /**
   * @ignore
   */
  ngOnInit() {}

  /**
   * Send reset password email
   * Display firebase errors if any
   */
  onResetPassword(email: string) {
    this.authService.sendPasswordResetEmail(email).catch(error => {
      this.authService.firebaseErrorHandler(error);
    });
  }
}
