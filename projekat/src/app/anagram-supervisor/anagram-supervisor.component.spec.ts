import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnagramSupervisorComponent } from './anagram-supervisor.component';

describe('AnagramSupervisorComponent', () => {
  let component: AnagramSupervisorComponent;
  let fixture: ComponentFixture<AnagramSupervisorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnagramSupervisorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnagramSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
