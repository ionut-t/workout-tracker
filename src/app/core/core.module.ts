import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { AppRoutingModule } from '../app-routing.module';

import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [NavigationComponent, HomeComponent],
  imports: [LayoutModule, AppRoutingModule, SharedModule],
  exports: [NavigationComponent, AppRoutingModule]
})
export class CoreModule {}
