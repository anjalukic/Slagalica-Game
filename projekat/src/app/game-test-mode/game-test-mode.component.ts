import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-test-mode',
  templateUrl: './game-test-mode.component.html',
  styleUrls: ['./game-test-mode.component.css']
})
export class GameTestModeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

}
