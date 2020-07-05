import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterUserService } from '../register-user.service';
import { Router } from '@angular/router';
import { User } from '../user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerFailed: string;
  errorMessage: string;
  gender: string;
  imageAsString: string;
  imageMessage: string;
  width: number;
  height: number;
  file: File;
  flag: boolean;
  sub: Subscription;
  constructor(public usersService: RegisterUserService, private router: Router) { }

  ngOnInit() {
    this.flag = false;
    this.imageMessage = ' ';
    this.errorMessage = '';
    this.sub = this.usersService.getUserAddedListener().subscribe((flag: boolean) => {
      if (flag) {
        this.router.navigate(['']);
      } else {
        this.registerFailed = 'Korisnicko ime ili email su vec zauzeti!';
      }
    });
  }


  onRegister(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (form.value.psw !== form.value.pswRepeated) {
      this.errorMessage = 'Lozinke se ne poklapaju!';
      return;
    }
    const user = new User(form.value.name, form.value.lastname,
      form.value.email, form.value.profession, form.value.username,
      form.value.psw, this.gender, form.value.jmbg,
      form.value.question, form.value.answer);
    if (!this.flag) {
      this.file = null;
    }
    this.usersService.addUser(user, this.file);
  }


  updateFile(event: Event) {
    this.file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    const image = new Image();

    reader.onload = () => {
      image.src = reader.result.toString();
    };
    image.onload = () => {
        this.width = image.width;
        this.height = image.height;
        if (this.width > 300 || this.height > 300) {
          this.imageMessage = 'Slika je prevelika!';
          this.imageAsString = ' ';
          return;
        }
        this.imageAsString = image.src;
        this.flag = true;
    };

    reader.readAsDataURL(this.file);
  }

  resetError() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
