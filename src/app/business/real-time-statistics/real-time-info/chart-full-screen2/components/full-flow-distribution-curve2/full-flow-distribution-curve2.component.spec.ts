import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullFlowDistributionCurve2Component } from './full-flow-distribution-curve2.component';

describe('FullFlowDistributionCurve2Component', () => {
  let component: FullFlowDistributionCurve2Component;
  let fixture: ComponentFixture<FullFlowDistributionCurve2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullFlowDistributionCurve2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullFlowDistributionCurve2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
