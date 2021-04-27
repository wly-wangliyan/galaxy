import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartFlowDistributionComponent } from './chart-flow-distribution.component';

describe('ChartFlowDistributionComponent', () => {
  let component: ChartFlowDistributionComponent;
  let fixture: ComponentFixture<ChartFlowDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartFlowDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartFlowDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
