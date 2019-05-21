import { Component, OnInit, OnDestroy } from '@angular/core';
import { WorkoutService } from '../workout.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from '../../shared/ui.service';

@Component({
  selector: 'app-new-workout',
  templateUrl: './new-workout.component.html',
  styleUrls: ['./new-workout.component.scss']
})
export class NewWorkoutComponent implements OnInit, OnDestroy {
  exercises: Exercise[] = [];
  private exerciseSubscription$: Subscription;
  private loadingSubscription$: Subscription;
  isLoading = false;

  constructor(
    private workoutService: WorkoutService,
    private uiService: UIService
  ) {}

  ngOnInit() {
    this.loadingSubscription$ = this.uiService.loadingStateChanged$.subscribe(
      isLoading => (this.isLoading = isLoading)
    );
    // Subscribe to the new subject
    this.exerciseSubscription$ = this.workoutService.exercisesChanged$.subscribe(
      exercises => (this.exercises = exercises)
    );
    this.fetchtListOfExercises();
  }

  // Fetch the list of exercises and initialize it in OnInit life cycle hook
  fetchtListOfExercises() {
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

    if (this.loadingSubscription$) {
      this.loadingSubscription$.unsubscribe();
    }
  }
}
