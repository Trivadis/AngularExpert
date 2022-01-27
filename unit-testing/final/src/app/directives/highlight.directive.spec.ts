import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { EmployeeListComponent } from '../components/employee-list/employee-list.component';
import { AbbrPipe } from '../pipes/abbr.pipe';
import { HighlightDirective } from './highlight.directive';

describe('Directive: HighlightDirective', () => {
  let fixture: ComponentFixture<EmployeeListComponent>;
  let employeeListComp: EmployeeListComponent;
  let element: any;

  //setup
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [EmployeeListComponent, HighlightDirective, AbbrPipe],
    });

    fixture = TestBed.createComponent(EmployeeListComponent);
    fixture.detectChanges();
    employeeListComp = fixture.componentInstance; // to access properties and methods
    element = fixture.nativeElement; // to access DOM elemen
  });

  //specs
  it(
    'should highlight a row',
    waitForAsync(() => {
      let tr = element.querySelector('.employee-row');

      tr.dispatchEvent(
        new MouseEvent('mouseenter', {
          view: window,
          bubbles: true,
          cancelable: true,
        })
      );
      fixture.detectChanges();

      expect(tr.style.backgroundColor).toEqual('yellow');
    })
  );

  it(
    'should highlight a row in a different color',
    waitForAsync(() => {
      let des = fixture.debugElement.queryAll(By.directive(HighlightDirective));
      const directive = des[0].injector.get(HighlightDirective);
      directive.highlightColor = 'red';
      fixture.detectChanges();

      let tr = element.querySelector('.employee-row');
      tr.dispatchEvent(
        new MouseEvent('mouseenter', {
          view: window,
          bubbles: true,
          cancelable: true,
        })
      );
      fixture.detectChanges();

      expect(tr.style.backgroundColor).toEqual('red');
    })
  );
});
