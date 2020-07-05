import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './user';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class LoginUserService {
  private userLogged = new Subject<{message: string, type: string}>();

  constructor(private http: HttpClient) {
  }

  getUserLoggedListener() {
    return this.userLogged.asObservable();
  }

  logUser(username: string, password: string) {

    this.http.post<{type: string, message: string}>('http://localhost:3000/login', {username, password})
    .subscribe((responseData) => {
      if (responseData.message === 'Success') {
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('type', responseData.type);
      }
      this.userLogged.next({message: responseData.message, type: responseData.type});
    });
  }

}
