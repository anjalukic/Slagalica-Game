import { Component, OnInit, OnDestroy } from '@angular/core';
import { Player } from '../player';
import { PlayerStatsService } from '../get-player-statistics.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-guest-user',
  templateUrl: './guest-user.component.html',
  styleUrls: ['./guest-user.component.css']
})
export class GuestUserComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['username', 'points'];
  playerStats20: Player[];
  playerStats30: Player[];
  sub1: Subscription;
  sub2: Subscription;
  constructor(private statsService: PlayerStatsService) { }

  ngOnInit() {
    this.sub1 = this.statsService.getStats20ArrivedListener().subscribe((players) => {
        this.playerStats20 = [...players];
    }
    );
    this.sub2 = this.statsService.getStats30ArrivedListener().subscribe((players) => {
      this.playerStats30 = [...players];
  }
  );
    this.statsService.getStatsfor20days();
    this.statsService.getStatsfor30days();
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

}
