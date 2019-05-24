import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Component for displaying the home page
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  /**
   * @ignore
   */
  ngOnInit() {}

  /**
   * Redirect user to the registration page
   */
  onJoin() {
    this.router.navigate(['/register']);
  }
}
