import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';

export interface Anagram {
  index: number;
  riddle: string;
  answer: string;
}

@Injectable({ providedIn: 'root' })
export class AnagramGameService {
  private anagramArrived = new Subject<string>();
  private pointsArrived = new Subject<number>();
  private allAnagramsArrived = new Subject<Anagram[]>();

  constructor(private http: HttpClient) {
  }

  getAnagramArrivedListener() {
    return this.anagramArrived.asObservable();
  }
  getPointsArrivedListener() {
    return this.pointsArrived.asObservable();
  }
  getAnagramsArrivedListener() {
    return this.allAnagramsArrived.asObservable();
  }

  getAnagram() {
    this.http.get<{ riddle: string, flag: boolean }>('http://localhost:3000/anagramGet')
      .subscribe((responseData) => {
        if (responseData.flag) {
          this.anagramArrived.next(responseData.riddle);
        } else {
          this.anagramArrived.next('');
        }
      });
  }

  submitAnagram(riddle: string, answer: string) {
    const username = sessionStorage.getItem('username');
    this.http.post<number>('http://localhost:3000/anagramSubmit', { username, riddle, answer })
      .subscribe((responseData) => {
        this.pointsArrived.next(responseData);
      });
  }

  getAllAnagrams() {
    this.http.get<{ anagrams: Anagram[], flag: boolean }>('http://localhost:3000/allAnagramsGet')
      .subscribe((responseData) => {
        if (responseData.flag) {
          this.allAnagramsArrived.next(responseData.anagrams);
        } else {
          this.allAnagramsArrived.next(null);
        }
      });
  }


}
