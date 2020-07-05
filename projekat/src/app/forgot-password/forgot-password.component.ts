import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPswService } from '../forgot-psw.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  message: string;
  sub: Subscription;
  constructor(private router: Router, public service: ForgotPswService) { }

  ngOnInit() {
    this.message = '';
    this.sub = this.service.getLoggedListener().subscribe((message) => {
      if (message === 'Success') {
        this.router.navigate(['Question']);
      } else {
        if (message === 'Wrong jmbg') {
          this.message = 'Pogresan JMBG!';
        } else {
          this.message = 'Pogresno korisnicko ime!';
        }
      }
    });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.service.logWithJMBG(form.value.username, form.value.jmbg);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
