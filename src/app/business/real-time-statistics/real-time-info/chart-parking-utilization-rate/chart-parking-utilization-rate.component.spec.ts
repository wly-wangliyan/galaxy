import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartParkingUtilizationRateComponent } from './chart-parking-utilization-rate.component';

describe('ChartParkingUtilizationRateComponent', () => {
  let component: ChartParkingUtilizationRateComponent;
  let fixture: ComponentFixture<ChartParkingUtilizationRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartParkingUtilizationRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartParkingUtilizationRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
