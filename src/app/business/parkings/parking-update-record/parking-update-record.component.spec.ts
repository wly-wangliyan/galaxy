import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingUpdateRecordComponent } from './parking-update-record.component';

describe('ParkingUpdateRecordComponent', () => {
  let component: ParkingUpdateRecordComponent;
  let fixture: ComponentFixture<ParkingUpdateRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingUpdateRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingUpdateRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
