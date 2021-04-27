import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Screen7RightThreeComponent } from './screen7-right-three.component';

describe('Screen7RightThreeComponent', () => {
  let component: Screen7RightThreeComponent;
  let fixture: ComponentFixture<Screen7RightThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Screen7RightThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Screen7RightThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
