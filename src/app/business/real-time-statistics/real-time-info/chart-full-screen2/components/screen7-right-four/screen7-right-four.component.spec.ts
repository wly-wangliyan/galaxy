import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Screen7RightFourComponent } from './screen7-right-four.component';

describe('Screen7RightFourComponent', () => {
  let component: Screen7RightFourComponent;
  let fixture: ComponentFixture<Screen7RightFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Screen7RightFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Screen7RightFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
