import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { EXERCISES } from './mock-exercises';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  constructor() {}

  getExercises(): Exercise[] {
    // Return a copy of the mock-exercises array
    return [...EXERCISES];
  }
}
