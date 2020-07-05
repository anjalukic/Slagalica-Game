import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ZGPair, ZGGameService } from '../zg-game.service';

@Component({
  selector: 'app-zggame',
  templateUrl: './zggame.component.html',
  styleUrls: ['./zggame.component.css']
})
export class ZGGameComponent implements OnInit, OnDestroy {
  sub: Subscription;
  riddle: string;
  timeString: string;
  timeUp: boolean;
  submitted: boolean;
  points = 0;
  evalString: string;
  letter = '';
  letters = ['A', 'B', 'V', 'G', 'D', 'Đ', 'E', 'Ž', 'Z', 'I', 'J', 'K', 'L', 'Lj', 'M', 'N',
    'Nj', 'O', 'P', 'R', 'S', 'T', 'Ć', 'U', 'F', 'H', 'C', 'Č', 'Dž', 'Š'];
  categories = ['Drzava', 'Grad', 'Jezero', 'Planina',
    'Reka', 'Zivotinja', 'Biljka', 'Muzicka grupa'];
  categoriesAnswer: ZGPair[] = new Array(8);
  timeLeft: number;
  interval;

  constructor(private router: Router , private gameService: ZGGameService) {

  }

  ngOnInit() {
    this.evalString = '';
    for (let i = 0; i < 8; i++) {
      this.categoriesAnswer[i] = { name: '', field: this.categories[i] };
    }
    this.letter = this.letters[Math.floor(Math.random() * 30)];
    this.timeString = 'Vreme pocinje kad odaberete sve brojeve!';
    this.timeUp = false;
    this.submitted = false;
    this.timeString = '02:00';
    this.timeLeft = 120;
    this.startTimer();
    this.sub = this.gameService.getPointsArrivedListener().subscribe(({valid, points, evalNeeded}) => {
      if (!valid) {
        this.evalString = 'Dogodila se greska na serveru, pokusajte kasnije!';
      } else {
        this.points += points;
        if (evalNeeded) {
          // tslint:disable-next-line: max-line-length
          this.evalString = 'Za odredjene pojmove ce supervizor morati da odluci da li se prihvataju, pa ce Vam poeni biti naknadno dodati.';
        }
      }
    });
  }

  ngOnDestroy(): void {
     this.sub.unsubscribe();
  }


  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        if (this.timeLeft >= 60) {
          this.timeString = '01:' + (this.timeLeft - 60 >= 10 ? '' : '0') + (this.timeLeft - 60).toString();
        } else {
          this.timeString = '00:' + (this.timeLeft >= 10 ? '' : '0') + this.timeLeft.toString();
        }
      } else {
        clearInterval(this.interval);
        this.timeUp = true;
        this.timeString = 'VREME JE ISTEKLO!';
      }
    }, 1000);
  }

  submit() {
    // check if letter is right
    for (let i = 0; i < 8; i++ ) {
      if (this.categoriesAnswer[i].name.substr(0, this.letter.length).toUpperCase() !== this.letter.toUpperCase() ) {
        this.categoriesAnswer[i].name = '';
      }
    }
    this.gameService.submitMyGame(this.categoriesAnswer);
    this.submitted = true;
    this.timeLeft = 0;
    this.timeUp = true;
  }

  navigateBack() {
    this.router.navigate(['player']);
  }

}
