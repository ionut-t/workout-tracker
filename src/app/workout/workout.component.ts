import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WorkoutService } from './workout.service';
import { Exercise } from './exercise.model';

/**
 * Main component for the workout section
 */
@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit, OnDestroy {
  workoutInProgress = false;
  private workoutSubscription$: Subscription;

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    /**
     * It will fire if the user will start a workout session
     */
    this.workoutSubscription$ = this.workoutService.selectedExercise$.subscribe(
      (exercise: Exercise) => {
        if (exercise) {
          this.workoutInProgress = true;
        } else {
          this.workoutInProgress = false;
        }
      }
    );
  }

  /**
   * Unsubscribe from the workout subscription
   */
  ngOnDestroy() {
    if (this.workoutSubscription$) {
      this.workoutSubscription$.unsubscribe();
    }
  }
}
