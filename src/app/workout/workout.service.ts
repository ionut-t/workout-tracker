import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { EXERCISES } from './mock-exercises';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private listOfExercises: Exercise[] = [...EXERCISES];
  private runningExercise: Exercise;
  exerciseSelected$ = new Subject<Exercise>();

  constructor() {}

  getExercises(): Exercise[] {
    // Return a copy of the mock-exercises array
    return this.listOfExercises;
  }

  startWorkout(selectedId: string) {
    // Find the exercise selected by the user
    this.runningExercise = this.listOfExercises.find(
      exercise => exercise.id === selectedId
    );

    // Emit a copy of the exercised selected by the user
    this.exerciseSelected$.next({ ...this.runningExercise });
  }
}
