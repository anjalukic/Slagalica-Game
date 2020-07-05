import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class GameOTDService {
  private gameOTDUpdated = new Subject<boolean>();

  constructor(private http: HttpClient) {
  }

  getGameUpdatedListener() {
    return this.gameOTDUpdated.asObservable();
  }

  submitGameOTD(date: Date, game: string, anagramIndex: number) {
    this.http.post<boolean>('http://localhost:3000/gameOTDSubmit', { date, game, anagramIndex })
      .subscribe((responseData) => {
        this.gameOTDUpdated.next(responseData);
      });
  }

}
