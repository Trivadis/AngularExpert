import { Component, OnDestroy, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Joke } from './models/joke.model';
import { DataService } from './services/data.service';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Angular PWA';
  joke$!: Observable<Joke>;
  catUrl$!: Observable<any>;

  isSubscribed = false;

  private destroy$ = new Subject<boolean>();

  private VAPID_PUBLIC?: string;
  constructor(
    private dataService: DataService,
    private notificationService: NotificationService,
    public swPush: SwPush
  ) {}

  ngOnInit(): void {
    this.joke$ = this.dataService.getJoke();
    this.catUrl$ = this.dataService.getCats();
    this.notificationService
      .getPublicKey()
      .pipe(takeUntil(this.destroy$))
      .subscribe((keyObj: { publicKey: string }) => {
        this.VAPID_PUBLIC = keyObj.publicKey;
        console.log('Received VAPID public key: ', keyObj.publicKey);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  subscribeToNotifications() {
    if (this.isSubscribed) {
      this.unsubscribeToNotifications();
    } else if (this.swPush.isEnabled && this.VAPID_PUBLIC) {
      this.swPush
        .requestSubscription({
          serverPublicKey: this.VAPID_PUBLIC,
        })
        .then((subObj: any) => {
          console.log('Granted notifications permission: ', subObj);
          this.notificationService
            .subscribeForNotifications(subObj)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => console.log('Subscribed.'));
        })
        .catch((err) => console.error('Could not subscribe: ', err));
    }
    this.isSubscribed = !this.isSubscribed;
  }

  unsubscribeToNotifications() {
    if (this.swPush.isEnabled) {
      this.notificationService
        .unsubscribeNotifications()
        .pipe(takeUntil(this.destroy$))
        .subscribe();
      this.swPush.unsubscribe().then(() => {
        console.log('Unsubscribed...');
      });
    }
  }
}
