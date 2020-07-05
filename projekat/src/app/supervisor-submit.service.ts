import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class SupervisorService {
  private anagramSent = new Subject<boolean>();
  private lettersSent = new Subject<boolean>();

  constructor(private http: HttpClient) {
  }

  getAnagramSentListener() {
    return this.anagramSent.asObservable();
  }

  getLettersSentListener() {
    return this.lettersSent.asObservable();
  }

  sendAnagram(riddle: string, answer: string) {
    this.http.post<{flag: boolean}>('http://localhost:3000/anagramUpdate', {riddle, answer})
    .subscribe((responseData) => {
      this.anagramSent.next(responseData.flag);
    });
  }

  sendLetters(letters: string[]) {
    this.http.post<boolean>('http://localhost:3000/lettersUpdate', letters)
    .subscribe((responseData) => {
      this.lettersSent.next(responseData);
    });
  }

}
