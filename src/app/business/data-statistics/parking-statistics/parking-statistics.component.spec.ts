import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingStatisticsComponent } from './parking-statistics.component';

describe('ParkingStatisticsComponent', () => {
  let component: ParkingStatisticsComponent;
  let fixture: ComponentFixture<ParkingStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
