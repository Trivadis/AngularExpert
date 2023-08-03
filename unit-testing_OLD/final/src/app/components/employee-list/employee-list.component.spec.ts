import { of } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeListComponent } from './employee-list.component';

describe('Component: EmployeeList', () => {
  let component: EmployeeListComponent;
  let employees: Employee[];
  let mockEmployeeService: any;

  //setup
  beforeEach(() => {
    employees = [
      {
        id: 1,
        name: 'Thomas Gassmann',
        email: 'thomas.gassmann@accenture.com',
      },
      {
        id: 2,
        name: 'Francesco Leardini',
        email: 'francesco.leardini@accenture.com',
      },
    ];

    mockEmployeeService = jasmine.createSpyObj(['getAll']);
    component = new EmployeeListComponent(mockEmployeeService);
  });

  //specs
  it('should initialize the employees correctly', () => {
    mockEmployeeService.getAll.and.returnValue(of(employees));

    component.ngOnInit();

    component.employees$.subscribe((list) => {
      expect(list.length).withContext('expected employees').toBe(2);
    });
    expect(mockEmployeeService.getAll).toHaveBeenCalled();
    expect(mockEmployeeService.getAll.calls.count())
      .withContext('one call')
      .toBe(1);
  });
});
