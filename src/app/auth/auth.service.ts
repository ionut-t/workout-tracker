import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { WorkoutService } from '../workout/workout.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  authChange$ = new Subject<boolean>();
  // user: User;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private workoutService: WorkoutService,
    private db: AngularFirestore
  ) {}

  // It is initialized in the app-component
  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.authChange$.next(true);
        this.isAuthenticated = true;

        // Redirect to the workout section
        this.router.navigate(['/workout']);
      } else {
        this.workoutService.cancelSubscriptions$();
        this.authChange$.next(false);
        this.isAuthenticated = false;

        // Redirect to the home page
        this.router.navigate(['']);
      }
    });
  }

  // Register the user based on the auth-data model
  registerUser(authData: AuthData) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        const user = this.afAuth.auth.currentUser;
        if (user != null) {
          this.addUserToDatabase({
            email: user.email,
            userId: user.uid
          });
        }
        console.log(result.user);
      })
      .catch(error => console.log(error));

    this.authChange$.next(true);
  }

  // Login the user based on the auth-data model
  loginUser(authData: AuthData) {
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => console.log(result))
      .catch(error => console.log(error.message));
  }

  // Logout the user
  logoutUser() {
    this.afAuth.auth.signOut();
  }

  // Check if the user is authenticated
  isAuth() {
    return this.isAuthenticated;
  }

  // Create a user collection
  private addUserToDatabase(user: User) {
    this.db.collection('users').add(user);
  }
}
