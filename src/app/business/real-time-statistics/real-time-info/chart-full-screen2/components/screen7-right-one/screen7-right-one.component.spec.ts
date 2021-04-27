import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Screen7RightOneComponent } from './screen7-right-one.component';

describe('Screen7RightOneComponent', () => {
  let component: Screen7RightOneComponent;
  let fixture: ComponentFixture<Screen7RightOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Screen7RightOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Screen7RightOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
