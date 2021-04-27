import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullParkingUtilizationRateComponent } from './full-parking-utilization-rate.component';

describe('FullParkingUtilizationRateComponent', () => {
  let component: FullParkingUtilizationRateComponent;
  let fixture: ComponentFixture<FullParkingUtilizationRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullParkingUtilizationRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullParkingUtilizationRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
