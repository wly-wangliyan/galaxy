import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullParkingFlowTableComponent } from './full-parking-flow-table.component';

describe('FullParkingFlowTableComponent', () => {
  let component: FullParkingFlowTableComponent;
  let fixture: ComponentFixture<FullParkingFlowTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullParkingFlowTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullParkingFlowTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
