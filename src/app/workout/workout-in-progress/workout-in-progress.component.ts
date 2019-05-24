import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopWorkoutComponent } from './stop-workout/stop-workout.component';
import { Subscription } from 'rxjs';
import { WorkoutService } from '../workout.service';

/**
 * Component for displaying the workout in progress
 */
@Component({
  selector: 'app-workout-in-progress',
  templateUrl: './workout-in-progress.component.html',
  styleUrls: ['./workout-in-progress.component.scss']
})
export class WorkoutInProgressComponent implements OnInit, OnDestroy {
  progress = 0;
  timer: any; // with type number VS Code will emit an error
  private dialogSubscription$: Subscription;

  constructor(
    private dialog: MatDialog,
    private workoutService: WorkoutService
  ) {}

  /**
   *  Trigger the timer
   */
  ngOnInit() {
    this.startOrResumeTimer();
  }

  /**
   * Start or resume timer
   * Return to the main workout page and reset the timer if timer has completed (100%)
   */
  startOrResumeTimer() {
    const step =
      (this.workoutService.getRunningWorkout().duration / 100) * 1000;
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        this.workoutService.completeWorkout();
        clearInterval(this.timer);
      }
    }, step);
  }

  /**
   * Pause the timer
   * Open the Stop Dialog and display the workout progress
   * Close or resume the workout session
   */
  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopWorkoutComponent, {
      data: {
        progress: this.progress
      }
    });

    this.dialogSubscription$ = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.workoutService.cancelWorkout(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }

  /**
   * Unsubscribe from the dialog subscription to prevent memory leaks
   */
  ngOnDestroy() {
    if (this.dialogSubscription$) {
      this.dialogSubscription$.unsubscribe();
    }
  }
}
