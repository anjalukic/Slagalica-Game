import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supervisor-page',
  templateUrl: './supervisor-page.component.html',
  styleUrls: ['./supervisor-page.component.css']
})
export class SupervisorPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

}
