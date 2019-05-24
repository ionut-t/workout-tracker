import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { WorkoutService } from '../workout/workout.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from './user.model';
import { UIService } from '../shared/ui.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  authChange$ = new Subject<boolean>();

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private workoutService: WorkoutService,
    private db: AngularFirestore,
    private uiService: UIService
  ) {}

  /**
   * It is initialized in the root component
   * Check if user exists and has validate his email
   * Redirect user
   * Cancel all firebase subscriptions if no user
   */
  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        if (user.emailVerified) {
          this.authChange$.next(true);
          this.isAuthenticated = true;
          this.router.navigate(['/workout']);
        }
      } else {
        this.workoutService.cancelFirebaseSubscriptions$();
        this.authChange$.next(false);
        this.isAuthenticated = false;
      }
    });
  }

  /**
   * Indicate the loading process and emit an event after the process is finished
   * Register the user based on the auth-data model
   * Send verification email upon registration
   * Add user to the database
   * Display the error messages if any
   */
  registerUser(authData: AuthData) {
    this.uiService.loadingStateChanged$.next(true);
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => this.sendVerificationEmail())
      .then(result => {
        const user = this.afAuth.auth.currentUser;
        if (user != null) {
          this.addUserToDatabase({
            email: user.email,
            userId: user.uid
          });
        }
      })
      .then(result => this.uiService.loadingStateChanged$.next(false))
      .catch(error => {
        this.uiService.loadingStateChanged$.next(false);
        this.firebaseErrorHandler(error);
      });

    this.authChange$.next(false);
  }

  /**
   * Indicate the loading process and emit an event after the process is finished
   * Check if user's email has been verified
   * Login the user based on the auth-data model
   * Display warn and succesfull messages
   * Redirect user if no errors
   */
  loginUser(authData: AuthData) {
    this.uiService.loadingStateChanged$.next(true);
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        if (!result.user.emailVerified) {
          this.authChange$.next(false);
          this.uiService.showSnackBar(
            'Please validate your email address',
            null,
            5000,
            'top'
          );
        } else {
          this.uiService.showSnackBar('Login Successful', null, 3000, 'bottom');
          this.authChange$.next(true);
          this.router.navigate(['/workout']);
        }
      })
      .then(result => this.uiService.loadingStateChanged$.next(false))
      .catch(error => {
        this.uiService.loadingStateChanged$.next(false);
        this.firebaseErrorHandler(error);
      });
  }

  /**
   * Logout the user
   * Redirect to the home page
   * Display a succesful message
   */
  logoutUser() {
    this.afAuth.auth.signOut();
    this.router.navigate(['']);
    this.uiService.showSnackBar('Logout Successful', null, 3000, 'bottom');
  }

  /**
   * Return user authentication status
   */
  isAuth() {
    return this.isAuthenticated;
  }

  /**
   *
   * @param user: {User} -> add target to the database
   */
  private addUserToDatabase(user: User) {
    this.db.collection('users').add(user);
  }

  /**
   * Send verification email when is called
   * Inform user to validate his email
   */
  private async sendVerificationEmail() {
    await this.afAuth.auth.currentUser.sendEmailVerification();
    this.uiService.showSnackBar(
      'A verification email has been sent to you address. Validate you email before you login.',
      null,
      5000,
      'top'
    );
    await this.router.navigate(['/login']);
  }

  /**
   * Send email for password reset when is called
   */
  async sendPasswordResetEmail(resetPasswordEmail: string) {
    await this.afAuth.auth.sendPasswordResetEmail(resetPasswordEmail);
    this.uiService.showSnackBar(
      'An email for resseting your password has been sent to your address. Check your inbox.',
      null,
      5000,
      'top'
    );
  }

  /**
   * @param error -> Handle errors catched by firebase
   */
  firebaseErrorHandler(error: Error) {
    this.uiService.showSnackBar(error.message, null, 5000, 'top');
  }
}
