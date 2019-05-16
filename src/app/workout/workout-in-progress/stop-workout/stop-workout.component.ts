import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-stop-workout',
  templateUrl: './stop-workout.component.html',
  styleUrls: ['./stop-workout.component.scss']
})
export class StopWorkoutComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {}
}
