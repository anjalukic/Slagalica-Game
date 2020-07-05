import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterNewPassComponent } from './enter-new-pass.component';

describe('EnterNewPassComponent', () => {
  let component: EnterNewPassComponent;
  let fixture: ComponentFixture<EnterNewPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterNewPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterNewPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
