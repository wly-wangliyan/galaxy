import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationCompanyParkingComponent } from './operation-company-parking.component';

describe('OperationCompanyParkingComponent', () => {
  let component: OperationCompanyParkingComponent;
  let fixture: ComponentFixture<OperationCompanyParkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationCompanyParkingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationCompanyParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
