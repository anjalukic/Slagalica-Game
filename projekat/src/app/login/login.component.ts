import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginUserService } from '../login-user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  message: string;
  username: string;
  sub: Subscription;

  constructor(public loginService: LoginUserService, private router: Router) { }

  ngOnInit() {
    this.message = '';
    this.sub = this.loginService.getUserLoggedListener().subscribe(({ message, type }) => {
      if (message === 'Success') {
        // navigacija - player, admin, supervisor
        this.router.navigate([type]);
      } else {
        if (message === 'Wrong password') {
          this.message = 'Pogresna lozinka!';
        } else {
          if (message === 'Wrong username') {
            this.message = 'Pogresno korisnicko ime!';
          } else {
            if (message === 'Not accepted') {
              alert('Jos uvek nije prihvacena vasa prijava!');
            } else {
              alert('Dogodila se greska!');
            }
          }
        }
      }
    });
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.username = form.value.username;
    this.loginService.logUser(form.value.username, form.value.psw);
  }

  goToForgotPsw() {

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
