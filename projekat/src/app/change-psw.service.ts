import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './user';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ChangePswService {
  private changedPassword = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  getchangedPasswordListener() {
    return this.changedPassword.asObservable();
  }

  changePassword(username: string, oldpsw: string, newpsw: string) {
    this.http.post<{message: string}>('http://localhost:3000/changePsw', {username, oldpsw, newpsw})
    .subscribe((responseData) => {
        this.changedPassword.next(responseData.message);
    });
  }
}
