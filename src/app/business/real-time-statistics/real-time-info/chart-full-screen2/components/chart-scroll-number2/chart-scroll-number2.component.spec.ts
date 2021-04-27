import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartScrollNumber2Component } from './chart-scroll-number2.component';

describe('ChartScrollNumber2Component', () => {
  let component: ChartScrollNumber2Component;
  let fixture: ComponentFixture<ChartScrollNumber2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartScrollNumber2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartScrollNumber2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
