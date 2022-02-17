import { fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { routes } from './app-routing.module';
import { AppModule } from './app.module';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';

describe('Router tests', () => {
  let router: Router;

  //setup
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), AppModule],
    });
  });
  beforeEach(() => {
    router = TestBed.inject(Router);
  });

  //specs
  it(
    'can navigate to employees (async)',
    waitForAsync(() => {
      router
        .navigate(['/employees'])
        .then(() => {
          expect(location.pathname.endsWith('/employees')).toBe(true);
        })
        .catch((e) => console.log(e));
    })
  );

  it('can navigate to employees (fakeAsync/tick)', fakeAsync(() => {
    router.navigate(['/employees']);
    //execute all pending asynchronous calls
    tick();
    expect(location.pathname.endsWith('/employees')).toBe(true);
  }));

  it('can navigate to employees (done)', (done) => {
    router
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
      router
        .navigate(['/employees/1'])
        .then(() => {
          expect(location.pathname.endsWith('/employees/1')).toBe(true);
        })
        .catch((e) => console.log(e));
    })
  );
});
