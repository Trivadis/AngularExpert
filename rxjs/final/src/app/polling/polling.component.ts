import { Component, OnInit } from '@angular/core';
import {
  concatMapTo,
  fromEvent,
  Observable,
  partition,
  repeatWhen,
  shareReplay,
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
    const onVisibilityChange$ = fromEvent(document, 'visibilitychange').pipe(
      shareReplay({ refCount: true, bufferSize: 1 })
    );

    const [pageVisible$, pageHidden$] = partition(
      onVisibilityChange$,
      () => document.visibilityState === 'visible'
    );

    const catAPI$ = this.dataService.getCats();

    this.catUrl$ = timer(0, 5000).pipe(
      concatMapTo(catAPI$),
      log('cat'),
      takeUntil(pageHidden$),
      repeatWhen(() => pageVisible$)
    );
  }
}
