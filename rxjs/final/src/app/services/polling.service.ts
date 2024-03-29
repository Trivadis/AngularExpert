import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, timer } from 'rxjs';

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

  keepTryingOnError() {
    return this.httpClient.get('https://wrongUrl')
      .pipe(
        // Retries 5 times in case of error
        retry(5),
        // Retries 2 times with 10 secs delay
        retry({
          count: 2,
          delay: 10000
        }),
        retry({
          count: 2,
          delay: (error, count) => {
           // Retry 2 times, but with an exponential step-back
           // maxing out at 30 secs.
           console.log('Last resort...');
           
           return timer(Math.min(30000, 2 ^ count * 1000))
          },
        })
      )
  }
}
