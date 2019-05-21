import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkoutRoutingModule } from './workout-routing.module';
import { WorkoutComponent } from './workout.component';
import { NewWorkoutComponent } from './new-workout/new-workout.component';
import { WorkoutInProgressComponent } from './workout-in-progress/workout-in-progress.component';
import { StopWorkoutComponent } from './workout-in-progress/stop-workout/stop-workout.component';
import { WorkoutLogsComponent } from './workout-logs/workout-logs.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    WorkoutComponent,
    NewWorkoutComponent,
    WorkoutInProgressComponent,
    StopWorkoutComponent,
    WorkoutLogsComponent
  ],
  imports: [WorkoutRoutingModule, SharedModule],
  entryComponents: [StopWorkoutComponent]
})
export class WorkoutModule {}
