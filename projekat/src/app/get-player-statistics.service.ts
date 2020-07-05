import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Player } from './player';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PlayerStatsService {
  private stats20Arrived = new Subject<Player[]>();
  private stats30Arrived = new Subject<Player[]>();
  private statsTodayArrived = new Subject<Player[]>();

  constructor(private http: HttpClient) {
  }

  getStats20ArrivedListener() {
    return this.stats20Arrived.asObservable();
  }
  getStats30ArrivedListener() {
    return this.stats30Arrived.asObservable();
  }
  getStatsTodayArrivedListener() {
    return this.statsTodayArrived.asObservable();
  }

  getStatsfor20days() {
    this.http.get<{players: Player[], flag: boolean}>('http://localhost:3000/playerStats20')
    .subscribe((responseData) => {
      if (responseData.flag) {
        this.stats20Arrived.next(responseData.players);
      } else {
        this.stats20Arrived.next([{username: 'Nema rezultata', points: 0}]);
      }
    });
  }
  getStatsfor30days() {
    this.http.get<{players: Player[], flag: boolean}>('http://localhost:3000/playerStats30')
    .subscribe((responseData) => {
      if (responseData.flag) {
        this.stats30Arrived.next(responseData.players);
      } else {
        this.stats30Arrived.next([{username: 'Nema rezultata', points: 0}]);
      }
    });
  }

  getTodayStats() {
    const username = sessionStorage.getItem('username');
    this.http.post<{players: Player[], flag: boolean}>('http://localhost:3000/playerStatsToday', {username})
    .subscribe((responseData) => {
      if (responseData.flag) {
        this.statsTodayArrived.next(responseData.players);
      } else {
        this.statsTodayArrived.next([{username: 'Nema rezultata', points: 0}]);
      }
    });
  }
}
