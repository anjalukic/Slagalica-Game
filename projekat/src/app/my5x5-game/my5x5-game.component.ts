import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { My5x5GameService } from '../my5x5-game.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my5x5-game',
  templateUrl: './my5x5-game.component.html',
  styleUrls: ['./my5x5-game.component.css']
})
export class My5x5GameComponent implements OnInit {
  points: number;
  numOfTries: number;
  size: number;
  letters: string[];
  usedLetters: string;
  opened: boolean[];
  gameDone: boolean;
  goBack: boolean;
  pickedLetter: string;
  sub1: Subscription;
  sub2: Subscription;

  constructor(private router: Router, private gameService: My5x5GameService) { }

  ngOnInit() {
    this.sub1 = this.gameService.getLettersListener().subscribe(({ flag, letters }) => {
      if (flag) {
        this.letters = [...letters];
        this.pickedLetter = this.letters[Math.floor(Math.random() * this.size * this.size)];
        this.onSubmit(null);
      } else {
        alert('Desila se greska na serveru! Pokusajte ponovo kasnije.');
      }
    });
    this.gameService.getLetters();
    this.numOfTries = 10;
    this.gameDone = false;
    this.goBack = false;
    this.points = 0;
    this.size = 5;
    this.letters = new Array(this.size * this.size);
    this.usedLetters = '';
    this.opened = new Array(this.size * this.size);
    for (let i = 0; i < this.size * this.size; i++) {
      this.opened[i] = false;
    }
    this.sub2 = this.gameService.getPointsSentListener().subscribe((flag) => {
      if (flag) {
        this.goBack = true;
      } else {
        alert('Desila se greska na serveru! Pokusajte ponovo kasnije.');
      }
    });
  }

  onSubmit(form: NgForm) {
    if (form != null) {
      this.usedLetters += ', ';
    }
    this.usedLetters += this.pickedLetter;
    if (form != null && form.invalid) {
      return;
    }
    let opened = false;
    for (let i = 0; i < this.size * this.size; i++) {
      if (!this.opened[i] && this.pickedLetter.toLowerCase() === this.letters[i].toLowerCase()) {
        this.opened[i] = true;
        opened = true;
        if (form != null) { this.points += 1; }
        this.findNewWords(i);
      }
    }
    if (!opened) {  this.numOfTries--; }
    if (form != null) {
      form.resetForm();
      if (this.numOfTries === 0 || this.checkEndGame()) {
        this.gameService.sendScore(this.points);
        this.gameDone = true;
      }
    }
  }

  findNewWords(i: number) {
    let newWord = true;
    // vertically
    let offset = i % this.size;
    for (let j = 0; j < this.size; j++) {
      if (!this.opened[j * this.size + offset]) {
        newWord = false;
        break;
      }
    }
    if (newWord) { this.points += 2; }
    newWord = true;
    offset = Math.floor(i / this.size);
    for (let j = 0; j < this.size; j++) {
      if (!this.opened[j + offset]) {
        newWord = false;
        break;
      }
    }
    if (newWord) { this.points += 2; }
  }

  navigateBack() {
    this.router.navigate(['player']);
  }

  checkEndGame(): boolean {
    let end = true;
    for (let i = 0; i < this.size * this.size; i++) {
      if (!this.opened[i]) {
        end = false;
      }
    }
    return end;
  }

}
