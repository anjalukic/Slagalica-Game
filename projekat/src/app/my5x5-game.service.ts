import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class My5x5GameService {
  private lettersArrived = new Subject<{flag: boolean, letters: string[]}>();
  private pointsSent = new Subject<boolean>();

  constructor(private http: HttpClient) {
  }

  getLettersListener() {
    return this.lettersArrived.asObservable();
  }

  getPointsSentListener() {
    return this.pointsSent.asObservable();
  }

  getLetters() {
    this.http.get<{letters: string[], flag: boolean}>('http://localhost:3000/5x5GameLetters')
    .subscribe((responseData) => {
        this.lettersArrived.next({flag: responseData.flag, letters: responseData.letters});
    });
  }

  sendScore(points: number) {
    const username = sessionStorage.getItem('username');
    this.http.post<boolean>('http://localhost:3000/5x5GameUpdatePoints', {username, points})
    .subscribe((responseData) => {
        this.pointsSent.next(responseData);
    });
  }
}
