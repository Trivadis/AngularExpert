import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CatsPhoto } from '../models/cats-photo.model';
import { Joke } from '../models/joke.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Randomly returns daddy jokes from: https://icanhazdadjoke.com
   */
  getJoke() {
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.httpClient.get<Joke>('https://icanhazdadjoke.com', { headers });
  }

  /**
   * Returns random cats photos
   */
  getCats() {
    return this.httpClient.get<CatsPhoto>(
      'https://api.thecatapi.com/v1/images/search'
    );
  }
}
