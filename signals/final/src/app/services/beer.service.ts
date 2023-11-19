import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { BeerItem } from '../model/beer.model';
import offlineMock from './offline_response.json';

@Injectable({
  providedIn: 'root'
})
export class BeerService {
  httpClient = inject(HttpClient);
  private readonly API_URL = 'https://api.punkapi.com/v2/beers';
  selectedBeers = signal<Partial<BeerItem>[]>([]);
  favCount: WritableSignal<number> = signal(0);

  cartTotal = computed(() => this.selectedBeers().reduce((total, beerItem) => (beerItem.price! * beerItem.qty!) + total, 0));

  getBeerList(): Observable<BeerItem[]> {
    return this.httpClient.get<BeerItem[]>(this.API_URL)
    .pipe(
      map(items => this.setRandomPrices(items)),
      catchError(() => {
        console.warn('The current data comes from a mocked response!');
        // In case of offline mode, return the mock data
        return of(offlineMock as BeerItem[]).pipe(map(items => this.setRandomPrices(items)));
      })
    );
  }

  updateFavCount(isLike: boolean) {
    this.favCount.update(count => isLike ? count + 1 : count - 1);
  }

  // The API does not return prices, so we set random prices for the demo.
  private setRandomPrices(items: BeerItem[]) {
    return items.map(item => {
      item.price = Math.floor(Math.random() * 20) + 1;
      return item;
    });
  } 
}
