import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UIService {
  // Emit an event when the loading state has changed
  loadingStateChanged$ = new Subject<boolean>();

  constructor(private snackBar: MatSnackBar) {}

  // Display errors catched by firebase
  showSnackBar(
    message: string,
    action: any,
    duration: number,
    position: MatSnackBarVerticalPosition
  ) {
    this.snackBar.open(message, action, {
      duration,
      verticalPosition: position
    });
  }
}
