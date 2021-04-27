import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitNumber2Component } from './split-number2.component';

describe('SplitNumber2Component', () => {
  let component: SplitNumber2Component;
  let fixture: ComponentFixture<SplitNumber2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplitNumber2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitNumber2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
