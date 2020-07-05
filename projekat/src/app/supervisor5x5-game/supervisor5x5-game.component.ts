import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SupervisorService } from '../supervisor-submit.service';

@Component({
  selector: 'app-supervisor5x5-game',
  templateUrl: './supervisor5x5-game.component.html',
  styleUrls: ['./supervisor5x5-game.component.css']
})
export class Supervisor5x5GameComponent implements OnInit, OnDestroy {

  sub: Subscription;
  constructor( private router: Router, private supService: SupervisorService) { }

  ngOnInit() {
    this.sub = this.supService.getLettersSentListener().subscribe((flag) => {
      if (flag) {
        alert('Uneto u bazu!');
      } else {
        alert('Doslo je do greske! Pokusajte ponovo!');
      }
    });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (form.value.fifth === '') {
      const letters = [...form.value.first].concat([...form.value.second]).concat([...form.value.third])
      .concat([...form.value.fourth]);
      this.supService.sendLetters(letters);
    } else {
      const letters = [...form.value.first].concat([...form.value.second]).concat([...form.value.third])
      .concat([...form.value.fourth]).concat([...form.value.fifth]);
      this.supService.sendLetters(letters);
    }
    form.resetForm();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
