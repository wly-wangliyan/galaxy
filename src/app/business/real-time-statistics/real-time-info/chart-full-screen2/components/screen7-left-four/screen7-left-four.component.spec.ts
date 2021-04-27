import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Screen7LeftFourComponent } from './screen7-left-four.component';

describe('Screen7LeftFourComponent', () => {
  let component: Screen7LeftFourComponent;
  let fixture: ComponentFixture<Screen7LeftFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Screen7LeftFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Screen7LeftFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
