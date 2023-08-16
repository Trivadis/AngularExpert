import { Component, OnInit } from '@angular/core';
import {
  concatMapTo,
  fromEvent,
  Observable,
  partition,
  repeat,
  switchMap,
  takeUntil,
  timer,
} from 'rxjs';
import { log } from '../helpers/rxjs.operator';
import { PollingService } from '../services/polling.service';

@Component({
  selector: 'app-polling',
  templateUrl: './polling.component.html',
})
export class PollingComponent implements OnInit {
  catUrl$?: Observable<any>;

  constructor(private dataService: PollingService) {}

  ngOnInit(): void {
    const onVisibilityChange$ = fromEvent(document, 'visibilitychange');

    const [pageVisible$, pageHidden$] = partition(
      onVisibilityChange$,
      () => document.visibilityState === 'visible'
    );

    const catAPI$ = this.dataService.getCats();

    this.catUrl$ = timer(0, 5000).pipe(
      switchMap(() => catAPI$),
      log('cat'),
      takeUntil(pageHidden$),
      repeat({ delay: () => pageVisible$ })
    );
  }
}
