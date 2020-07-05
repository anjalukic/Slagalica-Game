import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorPageComponent } from './supervisor-page.component';

describe('SupervisorPageComponent', () => {
  let component: SupervisorPageComponent;
  let fixture: ComponentFixture<SupervisorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupervisorPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
