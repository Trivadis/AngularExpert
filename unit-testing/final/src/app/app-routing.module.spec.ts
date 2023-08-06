import { APP_BASE_HREF, Location } from '@angular/common';
import { fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';

import { routes } from './app-routing.module';
import { AppModule } from './app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';

describe('Router tests', () => {
  let router: Router;
  let location: Location;

  //setup
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule.withRoutes(routes)],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }, Location],
      declarations: [WelcomeComponent, EmployeeComponent, EmployeeListComponent, EmployeeDetailComponent],
    });
  });
  beforeEach(() => {
    router = TestBed.inject(Router);
    location = TestBed.inject(Location); 
    router.initialNavigation(); 
  });

  //specs
  it(
    'can navigate to employees (async)',
    waitForAsync(() => {
      router
        .navigateByUrl('/employees')
        .then(() => {
          expect(location.path().endsWith('/employees')).toBe(true);
        })
        .catch((e) => console.log(e));
    })
  );

  it('can navigate to employees (fakeAsync/tick)', fakeAsync(() => {
    router.navigate(['/employees']);
    //execute all pending asynchronous calls
    tick();
    expect(location.path().endsWith('/employees')).toBe(true);
  }));

  it('can navigate to employees (done)', (done) => {
    router
      .navigate(['/employees'])
      .then(() => {
        expect(location.path().endsWith('/employees')).toBe(true);
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
          expect(location.path().endsWith('/employees/1')).toBe(true);
        })
        .catch((e) => console.log(e));
    })
  );
});
