import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Exercise } from '../exercise.model';
import { WorkoutService } from '../workout.service';
import { Subscription } from 'rxjs';

/**
 * Component for displaying results in a data table.
 */
@Component({
  selector: 'app-workout-logs',
  templateUrl: './workout-logs.component.html',
  styleUrls: ['./workout-logs.component.scss']
})
export class WorkoutLogsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<Exercise>();
  private workoutLogsChangedSubscription$: Subscription;

  /**
   * Columns displayed in the table.
   */
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];

  constructor(private workoutService: WorkoutService) {}

  /**
   * Display the workout results in the table logs.
   */
  ngOnInit() {
    this.workoutLogsChangedSubscription$ = this.workoutService.finishedWorkoutChanged$.subscribe(
      (workoutLogs: Exercise[]) => {
        this.dataSource.data = workoutLogs;
      }
    );
    this.workoutService.getCompletedOrCancelledWorkout();
  }

  /**
   * Sort the results stored in the table logs.
   * Add pagination to the table logs.
   */
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /**
   * @param filterValue
   * filter the results stored in the table logs.
   */
  onFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Unsubscribe from workout logs subscription to prevent memory leaks.
   */
  ngOnDestroy() {
    if (this.workoutLogsChangedSubscription$) {
      this.workoutLogsChangedSubscription$.unsubscribe();
    }
  }
}
