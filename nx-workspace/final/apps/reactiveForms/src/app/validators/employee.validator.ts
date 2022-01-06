import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { map } from 'rxjs/operators';
import { EmployeeService } from '../services/employee.service';

export class EmployeeValidators {
  static checkEmailsMatch(control: AbstractControl) {
    const email = control.get('email');
    const confirm = control.get('emailConfirm');
    if (!(email && confirm)) {
      return null;
    }
    return email.value === confirm.value ? null : { nomatch: true };
  }

  static emailValidator(control: AbstractControl): ValidationErrors | null {
    const val: string = control.value;
    if (!val || val.indexOf('@') > 0) {
      return null;
    }
    return { invalidemail: true };
  }

  static checkEmailUnique(service: EmployeeService) {
    return (control: AbstractControl) => {
      return service.checkEmailUnique(control.value).pipe(
        map((res) => {
          return res ? null : { emailNotUnique: true };
        })
      );
    };
  }
}
