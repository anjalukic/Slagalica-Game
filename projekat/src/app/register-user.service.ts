import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './user';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class RegisterUserService {
  private userAdded = new Subject<boolean>();

  constructor(private http: HttpClient) {
  }

  getUserAddedListener() {
    return this.userAdded.asObservable();
  }

  addUser(user: User, image: File) {
    if (image != null) {
      const data = new FormData();
      data.append('name', user.name);
      data.append('lastname', user.lastname);
      data.append('username', user.username);
      data.append('email', user.email);
      data.append('password', user.password);
      data.append('jmbg', user.jmbg);
      data.append('type', user.type);
      data.append('gender', user.gender);
      data.append('profession', user.profession);
      data.append('question', user.question);
      data.append('answer', user.answer);
      data.append('image', image, user.username);
      this.http.post<{ flag: boolean }>('http://localhost:3000/registerWithImage', data)
        .subscribe((responseData) => {
          this.userAdded.next(responseData.flag);
        });
    } else {
      this.http.post<{ flag: boolean }>('http://localhost:3000/register', user)
        .subscribe((responseData) => {
          this.userAdded.next(responseData.flag);
        });
    }
  }
}
