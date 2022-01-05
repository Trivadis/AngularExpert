import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeValidators } from './Validators/employee.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private fb: FormBuilder) {}

  form: FormGroup = this.fb.group({
    firstname: [
      '',
      {
        validators: Validators.required,
        updateOn: 'blur',
      },
    ],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, EmployeeValidators.emailValidator]],
    emailConfirm: [
      '',
      [Validators.required, EmployeeValidators.emailValidator],
    ],
  });

  get firstname() {
    return this.form.get('firstname');
  }
  get lastname() {
    return this.form.get('lastname');
  }
  get email() {
    return this.form.get('email');
  }
  get emailConfirm() {
    return this.form.get('emailConfirm');
  }
}
