import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import { EmployeeService } from './employee.service';

describe('Service: EmployeeService', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeeService],
    })
  );

  // beforeEach(inject([EmployeeService], (s: EmployeeService) => {
  //   service = s;
  // }));
  beforeEach(() => {
    service = TestBed.inject<EmployeeService>(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it(
    'should return all employees',
    waitForAsync(() => {
      service.getAll().subscribe((e) => {
        expect(e.length).toEqual(2);
      });
    })
  );

  it(
    'should return the employee with id 1',
    waitForAsync(() => {
      service.getById(1).subscribe((e) => {
        expect(e?.id).toEqual(1);
        expect(e?.name).toEqual('Thomas Gassmann');
      });
    })
  );

  it('example test for mock backend - getExampleProducts', () => {
    const dummy: { meta: any; products: { name: string }[] } = {
      meta: {},
      products: [{ name: 'computer' }, { name: 'phone' }],
    };

    service.getExampleProducts().subscribe((list) => {
      expect(list.length).toBe(2);
      expect(list).toEqual(dummy.products);
    });

    const request = httpMock.expectOne(`https://api.predic8.de/shop/products/`);

    // Assert that the request is a GET.
    expect(request.request.method).toBe('GET');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    request.flush(dummy);

    // Finally, assert that there are no outstanding requests.
    httpMock.verify();
  });
});
