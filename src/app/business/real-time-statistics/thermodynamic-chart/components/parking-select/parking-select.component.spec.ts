import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingSelectComponent } from './parking-select.component';

describe('ParkingSelectComponent', () => {
  let component: ParkingSelectComponent;
  let fixture: ComponentFixture<ParkingSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
