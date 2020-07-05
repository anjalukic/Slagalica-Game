import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AnagramGameService, Anagram } from '../anagram-game.service';
import { Subscription } from 'rxjs';
import { GameOTDService } from '../game-otd.service';

@Component({
  selector: 'app-game-otdpick',
  templateUrl: './game-otdpick.component.html',
  styleUrls: ['./game-otdpick.component.css']
})
export class GameOTDPickComponent implements OnInit, OnDestroy {

  minDate = new Date();
  pickedGame: string;
  games = [
    'Anagram', 'Moj broj', 'Zanimljiva geografija', '5x5'
  ];
  sub: Subscription;
  sub2: Subscription;
  anagrams: Anagram[];
  pickedAnagram: Anagram;
  anagramIsPicked: boolean;

  constructor(private anagramService: AnagramGameService, private gameService: GameOTDService ) { }

  ngOnInit() {
    this.sub = this.anagramService.getAnagramsArrivedListener().subscribe((anagrams) => {
      if (anagrams != null) {
        this.anagrams = [...anagrams];
      } else {
        alert('Desila se greska na serveru!');
      }
    });
    this.anagramIsPicked = false;
    this.anagramService.getAllAnagrams();
    this.sub2 = this.gameService.getGameUpdatedListener().subscribe((flag) => {
      if (flag) {
        alert('Uneto!');
      } else {
        alert('Igru dana su vec igrali korisnici, ne moze se sada promeniti!');
      }
    });
  }

  onSubmit(form: NgForm) {
    let index;
    if (this.anagramIsPicked) { index = this.pickedAnagram.index; } else { index = 0; }
    this.gameService.submitGameOTD(form.value.date, this.pickedGame, index);
  }

  change() {
    this.anagramIsPicked = (this.pickedGame === 'Anagram');
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }

}
