import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Screen7RightSixComponent } from './screen7-right-six.component';

describe('Screen7RightSixComponent', () => {
  let component: Screen7RightSixComponent;
  let fixture: ComponentFixture<Screen7RightSixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Screen7RightSixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Screen7RightSixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
