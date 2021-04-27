import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingFillingRateComponent } from './parking-filling-rate.component';

describe('ParkingFillingRateComponent', () => {
  let component: ParkingFillingRateComponent;
  let fixture: ComponentFixture<ParkingFillingRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingFillingRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingFillingRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
