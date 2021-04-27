import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Screen7RightFiveComponent } from './screen7-right-five.component';

describe('Screen7RightFiveComponent', () => {
  let component: Screen7RightFiveComponent;
  let fixture: ComponentFixture<Screen7RightFiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Screen7RightFiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Screen7RightFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
