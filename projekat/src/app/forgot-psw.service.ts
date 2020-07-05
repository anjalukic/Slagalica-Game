import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './user';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ForgotPswService {
  private question: string;
  private username: string;
  private logged = new Subject<string>();
  private questionSent = new Subject<string>();
  private answerChecked = new Subject<boolean>();
  private changedPassword = new Subject<boolean>();

  constructor(private http: HttpClient) {
  }

  getLoggedListener() {
    return this.logged.asObservable();
  }

  getQuestionListener() {
    return this.questionSent.asObservable();
  }

  getAnswerCheckedListener() {
    return this.answerChecked.asObservable();
  }

  getChangedPasswordListener() {
    return this.changedPassword.asObservable();
  }

  logWithJMBG(username: string, jmbg: string) {
    this.username = username;
    this.http.post<{message: string, question: string}>('http://localhost:3000/forgotPsw', {username, jmbg})
    .subscribe((responseData) => {
      this.question = responseData.question;
      this.logged.next(responseData.message);
    });
  }

  getQuestion() {
    this.questionSent.next(this.question);
  }

  checkAnswer(answer: string) {
    this.http.post<{flag: boolean}>('http://localhost:3000/checkAnswer', {username: this.username, answer})
    .subscribe((responseData) => {
      this.answerChecked.next(responseData.flag);
    });
  }

  changePassword(newPsw: string) {
    this.http.post<{flag: boolean}>('http://localhost:3000/updatePsw', {username: this.username, newPsw})
    .subscribe((responseData) => {
      this.changedPassword.next(responseData.flag);
    });
  }
}
