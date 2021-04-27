import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Screen7LeftThreeComponent } from './screen7-left-three.component';

describe('Screen7LeftThreeComponent', () => {
  let component: Screen7LeftThreeComponent;
  let fixture: ComponentFixture<Screen7LeftThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Screen7LeftThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Screen7LeftThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
