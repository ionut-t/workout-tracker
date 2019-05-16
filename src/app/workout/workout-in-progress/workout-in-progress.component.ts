import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workout-in-progress',
  templateUrl: './workout-in-progress.component.html',
  styleUrls: ['./workout-in-progress.component.scss']
})
export class WorkoutInProgressComponent implements OnInit {
  progress = 0;
  timer: any; // with type number VS Code will emit an error

  constructor() {}

  ngOnInit() {
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  onStop() {
    clearInterval(this.timer);
  }
}
