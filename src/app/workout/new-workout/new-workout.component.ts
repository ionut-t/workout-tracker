import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../workout.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-workout',
  templateUrl: './new-workout.component.html',
  styleUrls: ['./new-workout.component.scss']
})
export class NewWorkoutComponent implements OnInit {
  exercises: Exercise[] = [];

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    // Display a copy of the exercises list in the dropdown
    this.exercises = this.workoutService.getExercises();
  }
}
