import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  template: `
    <div class="content">
      <h2>Unit Testing Chapter</h2>
      <div class="card-container">
        <div class="role-section">
          <a [routerLink]="['/employees']">Employees</a>
        </div>
      </div>
    </div>
  `,
})
export class WelcomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
