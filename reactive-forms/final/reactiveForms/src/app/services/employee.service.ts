import { Injectable } from '@angular/core';

import { of, throwError as _throw } from 'rxjs';
import { delay, map } from 'rxjs/operators';

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
}
