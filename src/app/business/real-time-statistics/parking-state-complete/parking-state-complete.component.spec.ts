import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingStateCompleteComponent } from './parking-state-complete.component';

describe('ParkingStateCompleteComponent', () => {
  let component: ParkingStateCompleteComponent;
  let fixture: ComponentFixture<ParkingStateCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingStateCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingStateCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
