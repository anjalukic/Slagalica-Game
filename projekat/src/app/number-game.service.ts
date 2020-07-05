import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class MyNumberGameService {
  private pointsArrived = new Subject<number>();

  constructor(private http: HttpClient) {
  }

  getPointsArrivedListener() {
    return this.pointsArrived.asObservable();
  }

  submitMyNumber(points: number) {
    const username = sessionStorage.getItem('username');
    this.http.post<boolean>('http://localhost:3000/myNumberSubmit', { username, points })
      .subscribe((responseData) => {
        if (responseData) {
          this.pointsArrived.next(points);
        } else {
          this.pointsArrived.next(-1);
        }

      });
  }


}
