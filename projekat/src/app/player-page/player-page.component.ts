import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedPlayerService } from '../logged-player.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-player-page',
  templateUrl: './player-page.component.html',
  styleUrls: ['./player-page.component.css']
})
export class PlayerPageComponent implements OnInit, OnDestroy {

  sub1: Subscription;

  constructor(private router: Router, private playerService: LoggedPlayerService) { }

  ngOnInit() {
    this.sub1 = this.playerService.getGamePlayedListener().subscribe(({ flag, played, game }) => {
      if (flag) {
        if (!played) {
          // check what is game of the day
          if (game === 'anagram') {
            this.router.navigate(['anagramGame']);
            return;
          }
          if (game === 'zanimljiva geografija') {
            this.router.navigate(['zgGame']);
            return;
          }
          if (game === 'moj broj') {
            this.router.navigate(['myNumberGame']);
            return;
          }
          if (game === '5x5') {
            this.router.navigate(['my5x5Game']);
            return;
          }
        } else {
          alert('Vec ste odigrali igru dana za danas!');
        }
      } else {
        alert('Desila se greska na serveru! Pokusajte kasnije.');
      }
    });
  }

  navigate(path: string) {
    if (path === 'gameOfTheDay') {
      // check if user already played game od the day today
      this.playerService.wasGamePlayed();
    } else {
      this.router.navigate([path]);
    }
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
  }
}
