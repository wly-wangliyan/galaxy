import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingStateSimpleComponent } from './parking-state-simple.component';

describe('ParkingStateSimpleComponent', () => {
  let component: ParkingStateSimpleComponent;
  let fixture: ComponentFixture<ParkingStateSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingStateSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingStateSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
