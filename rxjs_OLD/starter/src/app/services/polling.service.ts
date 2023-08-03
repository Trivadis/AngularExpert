import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PollingService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Returns random cats photos
   */
  getCats() {
    return this.httpClient.get<any>(
      'https://api.thecatapi.com/v1/images/search'
    );
  }
}
