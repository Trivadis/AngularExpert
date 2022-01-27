import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private employees: Employee[] = [
    { id: 1, name: 'Thomas Gassmann', email: 'thomas.gassmann@trivadis.com' },
    {
      id: 2,
      name: 'Francesco Leardini',
      email: 'francesco.leardini@trivadis.com',
    },
  ];
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Employee[]> {
    return of(this.employees);
  }

  getById(id: number): Observable<Employee | undefined> {
    const employee = this.employees.find((e) => e.id === id);
    return of(employee);
  }

  getExampleProducts(): Observable<{ name: string }[]> {
    return this.httpClient
      .get<{ meta: any; products: { name: string }[] }>(
        'https://api.predic8.de/shop/products/'
      )
      .pipe(map((x) => x.products));
  }
}
