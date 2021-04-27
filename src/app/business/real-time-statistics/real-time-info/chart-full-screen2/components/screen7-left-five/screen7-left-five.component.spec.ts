import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Screen7LeftFiveComponent } from './screen7-left-five.component';

describe('Screen7LeftFiveComponent', () => {
  let component: Screen7LeftFiveComponent;
  let fixture: ComponentFixture<Screen7LeftFiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Screen7LeftFiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Screen7LeftFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
