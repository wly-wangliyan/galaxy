import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullParkingUtilizationRate2Component } from './full-parking-utilization-rate2.component';

describe('FullParkingUtilizationRate2Component', () => {
  let component: FullParkingUtilizationRate2Component;
  let fixture: ComponentFixture<FullParkingUtilizationRate2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullParkingUtilizationRate2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullParkingUtilizationRate2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
