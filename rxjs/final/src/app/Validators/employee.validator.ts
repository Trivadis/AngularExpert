import { AbstractControl, ValidationErrors } from '@angular/forms';

export class EmployeeValidators {
  static emailValidator(control: AbstractControl): ValidationErrors | null {
    const val: string = control.value;
    if (!val || val.indexOf('@') > 0) {
      return null;
    }
    return { invalidemail: true };
  }
}
