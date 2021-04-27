import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodTimeStatisticsComponent } from './period-time-statistics.component';

describe('PeriodTimeStatisticsComponent', () => {
  let component: PeriodTimeStatisticsComponent;
  let fixture: ComponentFixture<PeriodTimeStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodTimeStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodTimeStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
