import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnagramGameService } from '../anagram-game.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anagram-game',
  templateUrl: './anagram-game.component.html',
  styleUrls: ['./anagram-game.component.css']
})
export class AnagramGameComponent implements OnInit, OnDestroy {
  sub: Subscription;
  sub2: Subscription;
  riddle: string;
  message: string;
  timeUp: boolean;
  submitted: boolean;
  points: string;

  timeLeft: number;
  interval;

  constructor(private anagramService: AnagramGameService, private router: Router) {

  }

  ngOnInit() {
    this.message = '';
    this.sub = this.anagramService.getAnagramArrivedListener().subscribe((riddle) => {
      if (riddle !== '') {
        this.riddle = riddle;
        this.startTimer();
        this.message = '00:60';
      } else {
        this.message = 'Dogodila se greska na serveru!';
      }
    });
    this.timeUp = false;
    this.submitted = false;
    this.anagramService.getAnagram();
    this.timeLeft = 60;
    this.sub2 = this.anagramService.getPointsArrivedListener().subscribe((points) => {
      if (points < 0) {
        alert(points.toString());
        this.points = 'Dogodila se greska na serveru, pokusajte kasnije!';
      } else {
        this.points = 'Osvojili ste ' + points.toString() + ' poena!';
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }


startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.message = '00:' + (this.timeLeft >= 10 ? '' : '0') + this.timeLeft.toString();
      } else {
        clearInterval(this.interval);
        this.timeUp = true;
        this.message = 'VREME JE ISTEKLO!';
      }
    }, 1000 );
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.anagramService.submitAnagram(this.riddle, form.value.answer);
    this.submitted = true;
    this.timeLeft = 0;
    this.timeUp = true;
  }

  navigateBack() {
    this.router.navigate(['player']);
  }

}
