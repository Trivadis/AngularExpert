import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: 'employee-detail.component.html',
})
export class EmployeeDetailComponent implements OnInit {
  employee$!: Observable<Employee | undefined>;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.employee$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const employeeId = +(params.get('employeeId') ?? 0);
        return this.employeeService.getById(employeeId);
      })
    );
  }
}
