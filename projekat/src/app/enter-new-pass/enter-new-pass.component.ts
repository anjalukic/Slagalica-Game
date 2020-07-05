import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ForgotPswService } from '../forgot-psw.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-enter-new-pass',
  templateUrl: './enter-new-pass.component.html',
  styleUrls: ['./enter-new-pass.component.css']
})
export class EnterNewPassComponent implements OnInit, OnDestroy {
  sub: Subscription;
  constructor(private router: Router, public service: ForgotPswService) { }

  ngOnInit() {
    this.sub = this.service.getChangedPasswordListener().subscribe((flag) => {
      if (flag) {
        this.router.navigate(['']);
      } else {
        alert('Dogodila se greska!');
      }
    });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.service.changePassword(form.value.newPsw);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


}
