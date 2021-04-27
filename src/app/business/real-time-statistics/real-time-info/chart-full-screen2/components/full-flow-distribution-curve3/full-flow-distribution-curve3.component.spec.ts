import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullFlowDistributionCurve3Component } from './full-flow-distribution-curve3.component';

describe('FullFlowDistributionCurve3Component', () => {
  let component: FullFlowDistributionCurve3Component;
  let fixture: ComponentFixture<FullFlowDistributionCurve3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullFlowDistributionCurve3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullFlowDistributionCurve3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
