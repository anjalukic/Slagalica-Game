import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SupervisorService } from '../supervisor-submit.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anagram-supervisor',
  templateUrl: './anagram-supervisor.component.html',
  styleUrls: ['./anagram-supervisor.component.css']
})
export class AnagramSupervisorComponent implements OnInit, OnDestroy {

  sub: Subscription;
  constructor(private supService: SupervisorService, private router: Router) { }

  ngOnInit() {
    this.sub = this.supService.getAnagramSentListener().subscribe((flag) => {
      if (flag) {
        alert('Uneto u bazu anagrama!');
      } else {
        alert('Doslo je do greske! Pokusajte ponovo!');
      }
    });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.supService.sendAnagram(form.value.riddle, form.value.answer);
    form.resetForm();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
