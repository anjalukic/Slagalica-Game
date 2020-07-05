import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {}
  title = 'Kviz';

  navToUser() {
    const type = sessionStorage.getItem('type');
    if (type !== null && type !== '' )  {
      this.router.navigate([type]);
    }
  }

  logOut() {
    this.router.navigate(['']);
    sessionStorage.setItem('username', '');
    sessionStorage.setItem('type', '');
  }

  loggedIn() {
    const username = sessionStorage.getItem('username');
    if (username !== null && username !== '') {
      return true;
    } else {
      return false;
    }
  }

  navToHome() {
    this.router.navigate(['']);
    console.log(this.router.url);
  }

  home() {
    if (this.router.url !== '/') {return true; } else { return false; }
  }
}
