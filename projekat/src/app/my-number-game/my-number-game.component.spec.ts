import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyNumberGameComponent } from './my-number-game.component';

describe('MyNumberGameComponent', () => {
  let component: MyNumberGameComponent;
  let fixture: ComponentFixture<MyNumberGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyNumberGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyNumberGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
