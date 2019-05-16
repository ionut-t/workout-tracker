import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopWorkoutComponent } from './stop-workout.component';

describe('StopWorkoutComponent', () => {
  let component: StopWorkoutComponent;
  let fixture: ComponentFixture<StopWorkoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StopWorkoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
