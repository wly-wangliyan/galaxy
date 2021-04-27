import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationParkingComponent } from './operation-parking.component';

describe('OperationParkingComponent', () => {
  let component: OperationParkingComponent;
  let fixture: ComponentFixture<OperationParkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationParkingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
