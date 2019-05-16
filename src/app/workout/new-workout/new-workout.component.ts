import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../workout.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';

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

  // Launch workout session by getting access through the form to the ID of the exercise selected by the user
  onStartWorkout(form: NgForm) {
    this.workoutService.startWorkout(form.value.exercise);
  }
}
