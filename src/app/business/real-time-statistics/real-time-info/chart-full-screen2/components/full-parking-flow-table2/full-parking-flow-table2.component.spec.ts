import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullParkingFlowTable2Component } from './full-parking-flow-table2.component';

describe('FullParkingFlowTable2Component', () => {
  let component: FullParkingFlowTable2Component;
  let fixture: ComponentFixture<FullParkingFlowTable2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullParkingFlowTable2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullParkingFlowTable2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
