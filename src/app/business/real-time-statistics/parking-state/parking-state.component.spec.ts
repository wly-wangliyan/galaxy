import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingStateComponent } from './parking-state.component';

describe('ParkingStateComponent', () => {
  let component: ParkingStateComponent;
  let fixture: ComponentFixture<ParkingStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
