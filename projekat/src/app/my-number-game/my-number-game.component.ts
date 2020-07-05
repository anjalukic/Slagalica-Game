import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MyNumberGameService } from '../number-game.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-number-game',
  templateUrl: './my-number-game.component.html',
  styleUrls: ['./my-number-game.component.css']
})

export class MyNumberGameComponent implements OnInit, OnDestroy {
  timeString: string;
  timeUp: boolean;
  gameStarted: boolean;
  submitted: boolean;
  points: string;
  timersCounter: number;

  userNumber = 0;
  result: number;
  pickedOneDigit = new Array<number>(4);
  pickedTwoDigit: number;
  pickedThreeDigit: number;
  numbers1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  numbers2 = [10, 15, 20];
  numbers3 = [25, 50, 75, 100];
  expArray: { symbol: string, btnIndex: number }[] = new Array();
  exp = '';
  buttonsDisabled: boolean[] = new Array(6);

  timeLeft: number;
  numGenIntervals;
  gameInterval;
  sub: Subscription;
  constructor(private router: Router, private gameService: MyNumberGameService) { }

  ngOnInit() {
    for (let i = 0; i < 6; i++) {
      this.buttonsDisabled[i] = true;
    }
    this.timeString = 'Vreme pocinje kad odaberete sve brojeve!';
    this.timersCounter = 0;
    this.timeUp = false;
    this.submitted = false;
    this.gameStarted = false;
    this.points = '';

    this.sub = this.gameService.getPointsArrivedListener().subscribe((points) => {
      if (points < 0) {
        this.points = 'Dogodila se greska na serveru, pokusajte kasnije!';
      } else {
        this.points = 'Osvojili ste ' + points.toString() + ' poena!';
      }

    });
    this.startNumGenTimer();
  }

  startNumGenTimer() {
    this.numGenIntervals = new Array();
    this.numGenIntervals.push(setInterval(() => {
      this.result = Math.floor(Math.random() * 999 + 1);
    }, 100));
    for (let i = 0; i < 4; i++) {
      this.numGenIntervals.push(setInterval(() => {
        this.pickedOneDigit[i] = this.numbers1[Math.floor(Math.random() * 9)];
      }, 100));
    }
    this.numGenIntervals.push(setInterval(() => {
      this.pickedTwoDigit = this.numbers2[Math.floor(Math.random() * 3)];
    }, 100));
    this.numGenIntervals.push(setInterval(() => {
      this.pickedThreeDigit = this.numbers3[Math.floor(Math.random() * 4)];
    }, 100));
  }

  stop() {
    if (this.timersCounter < 7) {
      clearInterval(this.numGenIntervals[this.timersCounter]);
      this.timersCounter++;
      if (this.timersCounter === 7) {
        // start timer for game
        this.timeString = '00:60';
        this.timeLeft = 60;
        this.gameStarted = true;
        for (let i = 0; i < 6; i++) {
          this.buttonsDisabled[i] = false;
        }
        this.gameInterval = setInterval(() => {
          if (this.timeLeft > 0) {
            this.timeLeft--;
            this.timeString = '00:' + (this.timeLeft >= 10 ? '' : '0') + this.timeLeft.toString();
          } else {
            clearInterval(this.gameInterval);
            this.timeUp = true;
            this.timeString = 'VREME JE ISTEKLO!';
          }
        }, 1000);
      }
    }
  }

  write(symbol: string, button: number) {
    this.expArray.push({ symbol, btnIndex: button });
    this.exp = this.exp + symbol;
    if (button < 6) {
      for (let i = 0; i < 6; i++) {
        this.buttonsDisabled[i] = true;
      }
    } else {
      for (let i = 0; i < 6; i++) {
        this.buttonsDisabled[i] = false;
      }
      this.expArray.forEach(element => {
        this.buttonsDisabled[element.btnIndex] = true;
      });
    }
  }

  delete() {
    this.expArray.pop();
    if (this.expArray.length > 0) {
      const temp = this.expArray.pop();
      this.expArray.push(temp);
      if (temp.btnIndex < 6) {
        // last symbol is number
        for (let i = 0; i < 6; i++) {
          this.buttonsDisabled[i] = true;
        }
      } else {
        // last symbol is operation
        for (let i = 0; i < 6; i++) {
          this.buttonsDisabled[i] = false;
        }
        this.expArray.forEach(element => {
          this.buttonsDisabled[element.btnIndex] = true;
        });
      }
    } else {
      // deleted everything in expression
      for (let i = 0; i < 6; i++) {
        this.buttonsDisabled[i] = false;
      }
    }
    this.exp = '';
    this.expArray.forEach(element => {
      this.exp = this.exp + element.symbol;
    });
  }

  submit() {
    try {
      // tslint:disable-next-line: no-eval
      const value = eval(this.exp);
      // tslint:disable-next-line: triple-equals
      if (value != this.userNumber) {
        this.gameService.submitMyNumber(0);
      } else {
        // tslint:disable-next-line: triple-equals
        if (this.userNumber != this.result) {
          if (Math.abs(this.userNumber - this.result) < 10) {
            this.gameService.submitMyNumber(5);
          } else {
            this.gameService.submitMyNumber(5);
          }
        } else {
          this.gameService.submitMyNumber(10);
        }
      }
    } catch (e) {
      if (e instanceof SyntaxError) {
        this.gameService.submitMyNumber(0);
      }
    }
    this.submitted = true;
    this.timeLeft = 0;
    this.timeUp = true;
  }

  navigateBack() {
    this.router.navigate(['player']);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
