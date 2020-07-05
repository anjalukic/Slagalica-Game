import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZGSupervisorComponent } from './zgsupervisor.component';

describe('ZGSupervisorComponent', () => {
  let component: ZGSupervisorComponent;
  let fixture: ComponentFixture<ZGSupervisorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZGSupervisorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZGSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
