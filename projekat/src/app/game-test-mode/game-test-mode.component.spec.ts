import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTestModeComponent } from './game-test-mode.component';

describe('GameTestModeComponent', () => {
  let component: GameTestModeComponent;
  let fixture: ComponentFixture<GameTestModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameTestModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameTestModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
