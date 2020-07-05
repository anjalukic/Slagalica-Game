import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameOTDPickComponent } from './game-otdpick.component';

describe('GameOTDPickComponent', () => {
  let component: GameOTDPickComponent;
  let fixture: ComponentFixture<GameOTDPickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameOTDPickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameOTDPickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
