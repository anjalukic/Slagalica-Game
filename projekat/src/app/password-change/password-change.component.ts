import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangePswService } from '../change-psw.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit, OnDestroy {
  message: string;
  errorMessage: string;
  sub: Subscription;
  constructor(private router: Router, public service: ChangePswService) { }

  ngOnInit() {
    this.errorMessage = '';
    this.message = '';
    this.sub = this.service.getchangedPasswordListener().subscribe((message: string) => {
      if (message === 'Success') {
        this.router.navigate(['']);
      } else {
        if (message === 'Wrong password') {
          this.message = 'Pogresna lozinka!';
        } else if (message === 'Wrong username') {
          this.message = 'Pogresno korisnicko ime!';
        } else {
          alert('Dogodila se greska!');
        }
      }
    });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (form.value.newPsw !== form.value.newPswRepeated) {
      this.errorMessage = 'Lozinke se ne poklapaju!';
      return;
    }
    this.service.changePassword(form.value.username, form.value.psw, form.value.newPsw);
  }

  resetError() {
      this.errorMessage = '';
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


}
