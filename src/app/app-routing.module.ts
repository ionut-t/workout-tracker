import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'workout',
    loadChildren: './workout/workout.module#WorkoutModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'page-not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AuthRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
