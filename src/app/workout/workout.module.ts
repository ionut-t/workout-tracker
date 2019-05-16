import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkoutRoutingModule } from './workout-routing.module';
import { WorkoutComponent } from './workout.component';
import { NewWorkoutComponent } from './new-workout/new-workout.component';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { WorkoutInProgressComponent } from './workout-in-progress/workout-in-progress.component';
import { StopWorkoutComponent } from './workout-in-progress/stop-workout/stop-workout.component';

@NgModule({
  declarations: [
    WorkoutComponent,
    NewWorkoutComponent,
    WorkoutInProgressComponent,
    StopWorkoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    WorkoutRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ],
  entryComponents: [StopWorkoutComponent]
})
export class WorkoutModule {}
