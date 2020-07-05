import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Player } from './player';

@Injectable({ providedIn: 'root' })
export class LoggedPlayerService {
  private statsArrived = new Subject<Player[]>();
  private GameOfTheDayPlayed = new Subject<{ flag: boolean, played: boolean, game: string }>();

  constructor(private http: HttpClient) {
  }

  getStatsArrivedListener() {
    return this.statsArrived.asObservable();
  }
  getGamePlayedListener() {
    return this.GameOfTheDayPlayed.asObservable();
  }

  wasGamePlayed() {
    const um = sessionStorage.getItem('username');
    this.http.post<{ flag: boolean, played: boolean, game: string }>('http://localhost:3000/gamePlayed', { username: um })
      .subscribe((responseData) => {
        console.log(responseData.flag);
        console.log(responseData.played);
        console.log(responseData.game);
        this.GameOfTheDayPlayed.next({flag: responseData.flag, played: responseData.played, game: responseData.game});

      });
  }
}
