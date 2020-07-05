import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZGGameComponent } from './zggame.component';

describe('ZGGameComponent', () => {
  let component: ZGGameComponent;
  let fixture: ComponentFixture<ZGGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZGGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZGGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
