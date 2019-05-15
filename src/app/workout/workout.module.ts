import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkoutRoutingModule } from './workout-routing.module';
import { WorkoutComponent } from './workout.component';

@NgModule({
  declarations: [WorkoutComponent],
  imports: [CommonModule, WorkoutRoutingModule]
})
export class WorkoutModule {}
