import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { My5x5GameComponent } from './my5x5-game.component';

describe('My5x5GameComponent', () => {
  let component: My5x5GameComponent;
  let fixture: ComponentFixture<My5x5GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ My5x5GameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(My5x5GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
