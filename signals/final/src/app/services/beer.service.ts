import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BeerResponse } from '../model/beer.model';

@Injectable({
  providedIn: 'root'
})
export class BeerService {
  private readonly API_URL = 'https://api.punkapi.com/v2/beers';
  httpClient = inject(HttpClient);

  getBeerList(): Observable<BeerResponse[]> {
    return this.httpClient.get<BeerResponse[]>(this.API_URL);
  }
}
