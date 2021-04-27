import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Screen7RightTwoComponent } from './screen7-right-two.component';

describe('Screen7RightTwoComponent', () => {
  let component: Screen7RightTwoComponent;
  let fixture: ComponentFixture<Screen7RightTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Screen7RightTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Screen7RightTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
