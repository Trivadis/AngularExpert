import { fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { routes } from './app-routing.module';
import { AppModule } from './app.module';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';

describe('Router tests', () => {
  //setup
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), AppModule],
    });
  });

  //specs
  it(
    'can navigate to employees (async)',
    waitForAsync(() => {
      TestBed.inject(Router)
        .navigate(['/employees'])
        .then(() => {
          expect(location.pathname.endsWith('/employees')).toBe(true);
        })
        .catch((e) => console.log(e));
    })
  );

  it('can navigate to employees (fakeAsync/tick)', fakeAsync(() => {
    let fixture = TestBed.createComponent(EmployeeListComponent);
    TestBed.inject(Router).navigate(['/employees']);
    fixture.detectChanges();
    //execute all pending asynchronous calls
    tick();
    expect(location.pathname.endsWith('/employees')).toBe(true);
  }));

  it('can navigate to employees (done)', (done) => {
    TestBed.inject(Router)
      .navigate(['/employees'])
      .then(() => {
        expect(location.pathname.endsWith('/employees')).toBe(true);
        done();
      })
      .catch((e) => console.log(e));
  });

  it(
    'can navigate to employee details',
    waitForAsync(() => {
      TestBed.inject(Router)
        .navigate(['/employees/1'])
        .then(() => {
          expect(location.pathname.endsWith('/employees/1')).toBe(true);
        })
        .catch((e) => console.log(e));
    })
  );
});
