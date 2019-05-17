import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { EXERCISES } from './mock-exercises';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private listOfExercises: Exercise[] = [...EXERCISES];
  private runningWorkout: Exercise;
  selectedExercise$ = new Subject<Exercise>();
  private exercises: Exercise[] = [];

  constructor() {}

  getExercises(): Exercise[] {
    // Return a copy of the mock-exercises array
    return this.listOfExercises;
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
    this.exercises.push({
      ...this.runningWorkout,
      date: new Date(),
      state: 'completed'
    });
    this.runningWorkout = null;
    this.selectedExercise$.next(null);
  }

  // Store the results if workout is cancelled and reset the workout in progress
  cancelWorkout(progress: number) {
    this.exercises.push({
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

  getCompletedOrCancelledWorkout() {
    return [...this.exercises];
  }
}
