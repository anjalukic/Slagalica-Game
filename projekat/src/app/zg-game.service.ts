import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';

export interface ZGPair {
  name: string;
  field: string;
}

@Injectable({ providedIn: 'root' })
export class ZGGameService {
  private pointsArrived = new Subject<{valid: boolean, points: number, evalNeeded: boolean}>();

  constructor(private http: HttpClient) {
  }

  getPointsArrivedListener() {
    return this.pointsArrived.asObservable();
  }

  submitMyGame(zgForm: ZGPair[]) {
    const username = sessionStorage.getItem('username');
    zgForm.forEach(zgPair => {
      this.http.post<{valid: boolean, points: number, evalNeeded: boolean}>('http://localhost:3000/myZGSubmit', { username, zgPair })
      .subscribe((responseData) => {
          this.pointsArrived.next(responseData);
      });
    });
  }


}
