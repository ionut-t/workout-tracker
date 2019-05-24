import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UIService {
  /**
   * Event listener who wraps a boolean to indicate wheter the loading started or finished
   */
  loadingStateChanged$ = new Subject<boolean>();

  constructor(private snackBar: MatSnackBar) {}

  /**
   * Display a snack bar
   */
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
