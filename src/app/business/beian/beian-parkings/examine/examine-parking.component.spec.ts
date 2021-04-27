import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamineParkingComponent } from './examine-parking.component';

describe('ExamineParkingComponent', () => {
  let component: ExamineParkingComponent;
  let fixture: ComponentFixture<ExamineParkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamineParkingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamineParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
