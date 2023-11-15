import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { BeerResponse } from '../model/beer.model';
import offlineMock from './offline_response.json';

@Injectable({
  providedIn: 'root'
})
export class BeerService {
  private readonly API_URL = 'https://api.punkapi.com/v2/beers';
  httpClient = inject(HttpClient);

  getBeerList(): Observable<BeerResponse[]> {
    return this.httpClient.get<BeerResponse[]>(this.API_URL)
    .pipe(
      map(items => this.setRandomPrices(items)),
      catchError(() => {
        console.warn('The current data comes from a mocked response!');
        // In case of offline mode, return the mock data
        return of(offlineMock as BeerResponse[]).pipe(map(items => this.setRandomPrices(items)));
      })
    );
  }

  // The API does not return prices
  private setRandomPrices(items: BeerResponse[]) {
    return items.map(item => {
      item.price = Math.floor(Math.random() * 20) + 1;
      return item;
    });
  } 
}
