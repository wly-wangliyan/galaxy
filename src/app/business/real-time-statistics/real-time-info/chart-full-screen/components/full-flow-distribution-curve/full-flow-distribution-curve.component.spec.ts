import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullFlowDistributionCurveComponent } from './full-flow-distribution-curve.component';

describe('FullFlowDistributionCurveComponent', () => {
  let component: FullFlowDistributionCurveComponent;
  let fixture: ComponentFixture<FullFlowDistributionCurveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullFlowDistributionCurveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullFlowDistributionCurveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
