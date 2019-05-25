import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

/**
 * Component invoked programmatically for stop/resume workout dialog.
 */
@Component({
  selector: 'app-stop-workout',
  templateUrl: './stop-workout.component.html',
  styleUrls: ['./stop-workout.component.scss']
})
export class StopWorkoutComponent implements OnInit {
  /**
   * Inject token for accessing the data passed in the dialog.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  /**
   * @ignore
   */
  ngOnInit() {}
}
