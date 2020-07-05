import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './user';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class UserRequestsService {
  private requestsArrived = new Subject<{flag: boolean, users: User[]}>();
  private acceptDone = new Subject<boolean>();

  constructor(private http: HttpClient) {
  }

  getRequestsListener() {
    return this.requestsArrived.asObservable();
  }

  getAcceptListener() {
    return this.acceptDone.asObservable();
  }

  getRequests() {
    this.http.get<{users: User[], flag: boolean}>('http://localhost:3000/userRequests')
    .subscribe((responseData) => {
        this.requestsArrived.next({flag: responseData.flag, users: responseData.users});
    });
  }

  accept(user: User, accept: boolean) {
    this.http.post<boolean>('http://localhost:3000/acceptUser', {user, accept})
    .subscribe((responseData) => {
        this.acceptDone.next(responseData);
    });
  }
}
