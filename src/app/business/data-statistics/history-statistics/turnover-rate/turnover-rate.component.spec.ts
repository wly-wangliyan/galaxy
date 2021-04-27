import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoverRateComponent } from './turnover-rate.component';

describe('TurnoverRateComponent', () => {
  let component: TurnoverRateComponent;
  let fixture: ComponentFixture<TurnoverRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnoverRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoverRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
