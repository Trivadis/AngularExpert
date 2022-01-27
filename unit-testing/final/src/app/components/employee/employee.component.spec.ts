import { DebugElement } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { EmployeeComponent } from './employee.component';

describe('Component: Employee', () => {
  let fixture: ComponentFixture<EmployeeComponent>;
  let employeeComp: EmployeeComponent;
  let element: any;
  let de: DebugElement;

  //setup
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeComponent],
    });
    // .compileComponents(); // Ignore this section if you only run tests with the CLI ng test command because the CLI compiles the application before running the tests.

    fixture = TestBed.createComponent(EmployeeComponent);
    employeeComp = fixture.componentInstance; // to access properties and methods
    element = fixture.nativeElement; // to access DOM element
    de = fixture.debugElement; // test helper
  });

  //specs
  it(
    'should render the employee correctly',
    waitForAsync(() => {
      employeeComp.employee = {
        id: 1,
        name: 'Thomas Gassmann',
        email: 'thomas.gassmann@trivadis.com',
      };
      //trigger change detection
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(element.querySelector('.row').innerText).toBe('Id: 1');
        expect(de.query(By.css('.row')).nativeElement.innerText).toBe('Id: 1');
      });
    })
  );
});
