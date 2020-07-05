import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Supervisor5x5GameComponent } from './supervisor5x5-game.component';

describe('Supervisor5x5GameComponent', () => {
  let component: Supervisor5x5GameComponent;
  let fixture: ComponentFixture<Supervisor5x5GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Supervisor5x5GameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Supervisor5x5GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
