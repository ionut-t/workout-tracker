import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutInProgressComponent } from './workout-in-progress.component';

describe('WorkoutInProgressComponent', () => {
  let component: WorkoutInProgressComponent;
  let fixture: ComponentFixture<WorkoutInProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutInProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
