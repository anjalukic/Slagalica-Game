import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../user';
import { UserRequestsService } from '../user-requests.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-requests-page',
  templateUrl: './requests-page.component.html',
  styleUrls: ['./requests-page.component.css']
})
export class RequestsPageComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['username', 'name', 'lastname',
  'email', 'profession', 'gender', 'jmbg', 'accept'];
  users: User[];
  sub: Subscription;
  sub2: Subscription;

  constructor(private requestsService: UserRequestsService) { }

  ngOnInit() {
    this.sub = this.requestsService.getRequestsListener().subscribe(({flag, users}) => {
      if (flag) {
        this.users = [...users];
      } else {
        alert('Desila se greska na serveru!');
      }
    });
    this.requestsService.getRequests();
    this.sub2 = this.requestsService.getAcceptListener().subscribe((flag) => {
      if (flag) {
        alert('Uspesno azurirano!');
        this.requestsService.getRequests();
      } else {
        alert('Dogodila se greska na serveru!');
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }

  accept(user: User, accept: boolean) {
    this.requestsService.accept(user, accept);
  }

}
