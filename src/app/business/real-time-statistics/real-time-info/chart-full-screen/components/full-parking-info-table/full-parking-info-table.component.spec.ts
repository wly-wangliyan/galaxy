import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullParkingInfoTableComponent } from './full-parking-info-table.component';

describe('FullParkingInfoTableComponent', () => {
  let component: FullParkingInfoTableComponent;
  let fixture: ComponentFixture<FullParkingInfoTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullParkingInfoTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullParkingInfoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
