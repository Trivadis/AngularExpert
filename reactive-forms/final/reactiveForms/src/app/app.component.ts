import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from './services/employee.service';
import { EmployeeValidators } from './Validators/employee.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {}

  form: FormGroup = this.fb.group(
    {
      firstname: [
        '',
        {
          validators: Validators.required,
          updateOn: 'blur',
        },
      ],
      lastname: ['', Validators.required],
      email: [
        '',
        [Validators.required, EmployeeValidators.emailValidator],
        EmployeeValidators.checkEmailUnique(this.employeeService),
      ],
      emailConfirm: [
        '',
        [Validators.required, EmployeeValidators.emailValidator],
      ],
      addresses: this.fb.array([]),
    },
    {
      validators: EmployeeValidators.checkEmailsMatch,
      updateOn: 'blur',
    }
  );

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
  get addresses() {
    return this.form.get('addresses') as FormArray;
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      console.log('Submitting form values: ', this.form.value);
    } else {
      console.error('Form is invalid. Cannot submit...');
    }
  }

  newAddress(): FormGroup {
    return this.fb.group({
      street: '',
      city: '',
    });
  }
  addAddress(): void {
    const emptyAddress = this.newAddress();
    this.addresses.push(emptyAddress);
  }

  removeAddress(i: number) {
    this.addresses.removeAt(i);
  }
}
