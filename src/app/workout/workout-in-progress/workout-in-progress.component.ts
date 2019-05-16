import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopWorkoutComponent } from './stop-workout/stop-workout.component';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-workout-in-progress',
  templateUrl: './workout-in-progress.component.html',
  styleUrls: ['./workout-in-progress.component.scss']
})
export class WorkoutInProgressComponent implements OnInit, OnDestroy {
  progress = 0;
  timer: any; // with type number VS Code will emit an error
  private dialogSubscription$: Subscription;
  exitWorkout$ = new Subject<boolean>();

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.onStartOrResumeTimer();
  }

  onStartOrResumeTimer() {
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  onStop() {
    clearInterval(this.timer);
    // Open the Stop Dialog and display the progress on it
    const dialogRef = this.dialog.open(StopWorkoutComponent, {
      data: {
        progress: this.progress
      }
    });

    // Close or resume the workout session
    this.dialogSubscription$ = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.exitWorkout$.next();
      } else {
        this.onStartOrResumeTimer();
      }
    });
  }

  ngOnDestroy() {
    this.dialogSubscription$.unsubscribe();
  }
}
