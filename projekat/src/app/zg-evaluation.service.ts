import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';

export interface EvalPair {
  field: string;
  name: string;
  username: string;
  date: Date;
}
@Injectable({providedIn: 'root'})
export class ZGEvaluationService {
  private evalsArrived = new Subject<{flag: boolean, evals: EvalPair[]}>();
  private acceptDone = new Subject<boolean>();

  constructor(private http: HttpClient) {
  }

  getEvalsListener() {
    return this.evalsArrived.asObservable();
  }

  getAcceptListener() {
    return this.acceptDone.asObservable();
  }

  getEvals() {
    this.http.get<{evals: EvalPair[], flag: boolean}>('http://localhost:3000/zgEvals')
    .subscribe((responseData) => {
        this.evalsArrived.next({flag: responseData.flag, evals: responseData.evals});
    });
  }

  accept(evalPair: EvalPair, accept: boolean) {
    this.http.post<boolean>('http://localhost:3000/acceptEval', {evalPair, accept})
    .subscribe((responseData) => {
        this.acceptDone.next(responseData);
    });
  }
}
