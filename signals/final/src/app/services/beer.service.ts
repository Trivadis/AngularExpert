import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
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
      catchError(() => {
        console.warn('The current data comes from a mocked response!');
        // In case of offline mode, return the mock data
        return of(offlineMock as BeerResponse[]) ;
      })
    );
  }
}
