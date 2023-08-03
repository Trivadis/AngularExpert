import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { PollingService } from '../services/polling.service';

@Component({
  selector: 'app-polling',
  templateUrl: './polling.component.html',
})
export class PollingComponent implements OnInit {
  catUrl$?: Observable<any>;

  constructor(private dataService: PollingService) {}

  ngOnInit(): void {
    this.catUrl$ = this.dataService.getCats();
  }
}
