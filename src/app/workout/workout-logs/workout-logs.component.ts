import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Exercise } from '../exercise.model';
import { WorkoutService } from '../workout.service';

@Component({
  selector: 'app-workout-logs',
  templateUrl: './workout-logs.component.html',
  styleUrls: ['./workout-logs.component.scss']
})
export class WorkoutLogsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<Exercise>();

  // Columns displayed in the table
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    // Display the workout results in the table logs
    this.dataSource.data = this.workoutService.getCompletedOrCancelledWorkout();
  }

  ngAfterViewInit() {
    // Sort the results stored in the table logs
    this.dataSource.sort = this.sort;
    // Add pagination to the table logs
    this.dataSource.paginator = this.paginator;
  }

  // Filter the results stored in the table logs
  onFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
