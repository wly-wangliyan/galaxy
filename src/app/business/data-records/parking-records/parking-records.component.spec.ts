import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingRecordsComponent } from './parking-records.component';

describe('ParkingRecordsComponent', () => {
  let component: ParkingRecordsComponent;
  let fixture: ComponentFixture<ParkingRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
