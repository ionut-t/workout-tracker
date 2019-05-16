import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkoutRoutingModule } from './workout-routing.module';
import { WorkoutComponent } from './workout.component';
import { NewWorkoutComponent } from './new-workout/new-workout.component';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [WorkoutComponent, NewWorkoutComponent],
  imports: [
    CommonModule,
    FormsModule,
    WorkoutRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class WorkoutModule {}
