import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartParkingSpotTopsComponent } from './chart-parking-spot-tops.component';

describe('ChartParkingSpotTopsComponent', () => {
  let component: ChartParkingSpotTopsComponent;
  let fixture: ComponentFixture<ChartParkingSpotTopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartParkingSpotTopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartParkingSpotTopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
