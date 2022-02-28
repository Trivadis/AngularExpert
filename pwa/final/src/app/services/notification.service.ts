import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  readonly BASE_URL = 'http://localhost:3000/notifications';

  constructor(private httpClient: HttpClient) {}

  getPublicKey(): Observable<{ publicKey: string }> {
    return this.httpClient.get<{ publicKey: string }>(`${this.BASE_URL}/key`);
  }

  subscribeForNotifications(subscriptionObj: any) {
    return this.httpClient.post(`${this.BASE_URL}/subscribe`, subscriptionObj, {
      responseType: 'text',
    });
  }
  unsubscribeNotifications(): Observable<Object> {
    return this.httpClient.delete(`${this.BASE_URL}/unsubscribe`, {
      responseType: 'text',
    });
  }
}
