import { Component, OnInit, OnDestroy } from '@angular/core';
import { WorkoutService } from '../workout.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-workout',
  templateUrl: './new-workout.component.html',
  styleUrls: ['./new-workout.component.scss']
})
export class NewWorkoutComponent implements OnInit, OnDestroy {
  exercises: Exercise[] = [];
  exerciseSubscription$: Subscription;

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    // Subscribe to the new subject
    this.exerciseSubscription$ = this.workoutService.exercisesChanged$.subscribe(
      exercises => (this.exercises = exercises)
    );
    this.fetchedListOfExercises();
  }

  // Fetch the list of exercises and initialize it in OnInit life cycle hook
  fetchedListOfExercises() {
    this.workoutService.getListOfExercises();
  }

  /* Launch workout session by getting access through the form to
  the ID of the exercise selected by the user */
  onStartWorkout(form: NgForm) {
    this.workoutService.startWorkout(form.value.exercise);
  }

  ngOnDestroy() {
    if (this.exerciseSubscription$) {
      this.exerciseSubscription$.unsubscribe();
    }
  }
}
