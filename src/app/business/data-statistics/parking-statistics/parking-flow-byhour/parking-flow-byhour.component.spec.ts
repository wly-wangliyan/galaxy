import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingFlowByhourComponent } from './parking-flow-byhour.component';

describe('ParkingFlowByhourComponent', () => {
  let component: ParkingFlowByhourComponent;
  let fixture: ComponentFixture<ParkingFlowByhourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingFlowByhourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingFlowByhourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
