import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Player } from '../player';
import { PlayerStatsService } from '../get-player-statistics.service';

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.css']
})
export class PlayerStatsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['username', 'points'];
  playerStats: Player[];
  sub: Subscription;

  constructor(private statsService: PlayerStatsService) { }

  ngOnInit() {
    this.sub = this.statsService.getStatsTodayArrivedListener().subscribe((players) => {
        this.playerStats = [...players];
    }
    );
    this.statsService.getTodayStats();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
