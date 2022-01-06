import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { FormFieldConfig } from '../models/form-field-config.model';
import { FormFieldType } from '../models/form-field-types.enum';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor() {}

  checkEmailUnique(email: string) {
    // service call for example
    return of(email).pipe(
      delay(1000),
      map((e) => e !== 'info@trivadis.com')
    );
  }

  getDynamicFormFields(
    userType: 'user' | 'admin'
  ): Observable<FormFieldConfig[]> {
    // The condition here is just for sake of example
    // to simulate a server providing different configs
    if (userType === 'admin') {
      return of([
        {
          fieldId: 'role',
          type: FormFieldType.text,
          value: 'Site admin',
          label: 'User role',
          disabled: true,
        },
        {
          fieldId: 'onDuty',
          type: FormFieldType.checkbox,
          label: 'On duty',
          value: true,
        },
      ]);
    } else {
      return of([
        {
          fieldId: 'role',
          type: FormFieldType.text,
          value: 'Client',
          label: 'User role',
          disabled: true,
        },
        {
          fieldId: 'companyName',
          type: FormFieldType.text,
          label: 'Company Name',
          value: 'Trivadis',
          required: true,
        },
        {
          fieldId: 'favTech',
          type: FormFieldType.text,
          label: 'Favourite technology',
        },
      ]);
    }
  }
}
