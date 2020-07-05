import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPswService } from '../forgot-psw.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-answer-question',
  templateUrl: './answer-question.component.html',
  styleUrls: ['./answer-question.component.css']
})
export class AnswerQuestionComponent implements OnInit, OnDestroy {
  question: string;
  sub: Subscription;
  sub2: Subscription;
  constructor(private router: Router, public questionService: ForgotPswService) { }

  ngOnInit() {
    this.sub = this.questionService.getQuestionListener().subscribe((question) => {
      this.question = question;
    });
    this.questionService.getQuestion();
    this.sub2 = this.questionService.getAnswerCheckedListener().subscribe((flag) => {
      if (flag) {
        this.router.navigate(['NewPass']);
      } else {
        this.router.navigate(['']);
      }
    });

  }

  onAnswer(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.questionService.checkAnswer(form.value.answer);

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }

}
