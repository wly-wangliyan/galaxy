import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullParkingAccessStateComponent } from './full-parking-access-state.component';

describe('FullParkingAccessStateComponent', () => {
  let component: FullParkingAccessStateComponent;
  let fixture: ComponentFixture<FullParkingAccessStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullParkingAccessStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullParkingAccessStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
