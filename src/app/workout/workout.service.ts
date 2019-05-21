import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Subject, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { UIService } from '../shared/ui.service';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private listOfExercises: Exercise[] = [];
  private runningWorkout: Exercise;
  selectedExercise$ = new Subject<Exercise>();
  exercisesChanged$ = new Subject<Exercise[]>();
  finishedWorkoutChanged$ = new Subject<Exercise[]>();
  private firebaseSubscriptions$: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private uiService: UIService
  ) {}

  // Get the list of exercises from the firestore database
  getListOfExercises() {
    this.uiService.loadingStateChanged$.next(true);
    this.firebaseSubscriptions$.push(
      this.db
        .collection('listOfExercises')
        .snapshotChanges()
        .pipe(
          map(docArray => {
            return docArray.map(document => {
              return {
                id: document.payload.doc.id,
                name: document.payload.doc.get('name'),
                duration: document.payload.doc.get('duration'),
                calories: document.payload.doc.get('calories')
              };
            });
          })
        )
        .subscribe(
          (exercises: Exercise[]) => {
            this.uiService.loadingStateChanged$.next(false);
            // Store the fetched exercises
            this.listOfExercises = exercises;
            // Emit a new copy of the list of exercises
            this.exercisesChanged$.next([...this.listOfExercises]);
          },
          error => {
            this.uiService.loadingStateChanged$.next(false);
            this.uiService.showSnackBar(
              'Loading exercises failed. Please try again later.',
              null,
              5000,
              'top'
            );
            this.exercisesChanged$.next(null);
          }
        )
    );
  }

  startWorkout(selectedId: string) {
    // Find the exercise selected by the user
    this.runningWorkout = this.listOfExercises.find(
      exercise => exercise.id === selectedId
    );

    // Emit a copy of the exercised selected by the user
    this.selectedExercise$.next({ ...this.runningWorkout });
  }

  // Store the results if workout is complete and reset the workout in progress
  completeWorkout() {
    this.addDataToDatabase({
      ...this.runningWorkout,
      date: new Date(),
      state: 'completed'
    });
    this.runningWorkout = null;
    this.selectedExercise$.next(null);
  }

  // Store the results if workout is cancelled and reset the workout in progress
  cancelWorkout(progress: number) {
    this.addDataToDatabase({
      ...this.runningWorkout,
      duration: this.runningWorkout.duration * (progress / 100),
      calories: this.runningWorkout.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningWorkout = null;
    this.selectedExercise$.next(null);
  }

  getRunningWorkout() {
    return { ...this.runningWorkout };
  }

  // Fetch completed or cancelled workout from the server
  getCompletedOrCancelledWorkout() {
    const userId = this.afAuth.auth.currentUser.uid;
    this.firebaseSubscriptions$.push(
      this.db
        .collection(`users/${userId}/finishedWorkout`)
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
          /* Emit a new value whenever the user gets a new finished
        workout session from the server */
          this.finishedWorkoutChanged$.next(exercises);
        })
    );
  }

  // Cancel all firebase subscriptions
  cancelSubscriptions$() {
    this.firebaseSubscriptions$.forEach(subscription$ =>
      subscription$.unsubscribe()
    );
  }

  // Add completed or cancelled workout to the database
  private addDataToDatabase(workout: Exercise) {
    const userId = this.afAuth.auth.currentUser.uid;
    this.db.collection(`users/${userId}/finishedWorkout`).add(workout);
  }
}
