import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturerParkingComponent } from './manufacturer-parking.component';

describe('ManufacturerParkingComponent', () => {
  let component: ManufacturerParkingComponent;
  let fixture: ComponentFixture<ManufacturerParkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManufacturerParkingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturerParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
