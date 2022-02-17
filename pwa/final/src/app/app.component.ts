import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { Observable } from 'rxjs';
import { Joke } from './models/joke.model';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Angular PWA';

  joke$!: Observable<Joke>;
  catUrl$!: Observable<any>;

  pushSubscription?: any;

  private VAPID_PUBLIC =
    'BJW6FqD_9R1GQfFaEn4RcKWHeL-TjTsJw4XjGY3V8p7SI_e2MZBz2LUcWtMXHF58htVGdfObL_RGVl2IRFwS8Kk';

  constructor(private dataService: DataService, public swPush: SwPush) {}

  ngOnInit(): void {
    this.joke$ = this.dataService.getJoke();
    this.catUrl$ = this.dataService.getCats();
  }

  subscribeToNotifications() {
    if (this.swPush.isEnabled) {
      this.swPush
        .requestSubscription({
          serverPublicKey: this.VAPID_PUBLIC,
        })
        .then((subObj) => {
          this.pushSubscription = subObj;
          console.log(subObj);

          // TODO: Here we would send the PushSubscription to the server
        })
        .catch((err) => console.error('Could not subscribe: ', err));
    }
  }
}
