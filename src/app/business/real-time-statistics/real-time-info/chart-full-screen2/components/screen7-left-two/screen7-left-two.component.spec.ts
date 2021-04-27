import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Screen7LeftTwoComponent } from './screen7-left-two.component';

describe('Screen7LeftTwoComponent', () => {
  let component: Screen7LeftTwoComponent;
  let fixture: ComponentFixture<Screen7LeftTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Screen7LeftTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Screen7LeftTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
