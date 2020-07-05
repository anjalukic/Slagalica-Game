import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ZGEvaluationService, EvalPair } from '../zg-evaluation.service';

@Component({
  selector: 'app-zgsupervisor',
  templateUrl: './zgsupervisor.component.html',
  styleUrls: ['./zgsupervisor.component.css']
})
export class ZGSupervisorComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['field', 'name', 'accept'];
  evals: EvalPair[];
  sub: Subscription;
  sub2: Subscription;

  constructor(private evalsService: ZGEvaluationService) { }

  ngOnInit() {
    this.sub = this.evalsService.getEvalsListener().subscribe(({flag, evals}) => {
      if (flag) {
        this.evals = [...evals];
      } else {
        alert('Desila se greska na serveru!');
      }
    });
    this.evalsService.getEvals();
    this.sub2 = this.evalsService.getAcceptListener().subscribe((flag) => {
      if (flag) {
        alert('Uspesno azurirano!');
        this.evalsService.getEvals();
      } else {
        alert('Dogodila se greska na serveru!');
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }

  accept(evalPair: EvalPair, accept: boolean) {
    this.evalsService.accept(evalPair, accept);
  }

}
