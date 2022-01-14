import {
  concatMapTo,
  fromEvent,
  map,
  Observable,
  partition,
  repeatWhen,
  shareReplay,
  Subject,
  takeUntil,
  tap,
  timer,
} from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PollingService } from './polling.service';

@Component({
  selector: 'app-polling',
  templateUrl: './polling.component.html',
  styleUrls: ['./polling.component.scss'],
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
      takeUntil(pageHidden$),
      repeatWhen(() => pageVisible$)
    );
  }
}
