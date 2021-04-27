import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Screen7LeftOneComponent } from './screen7-left-one.component';

describe('Screen7LeftOneComponent', () => {
  let component: Screen7LeftOneComponent;
  let fixture: ComponentFixture<Screen7LeftOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Screen7LeftOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Screen7LeftOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
