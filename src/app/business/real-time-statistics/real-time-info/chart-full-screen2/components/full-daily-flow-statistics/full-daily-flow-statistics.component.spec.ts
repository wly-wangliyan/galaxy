import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullDailyFlowStatisticsComponent } from './full-daily-flow-statistics.component';

describe('FullDailyFlowStatisticsComponent', () => {
  let component: FullDailyFlowStatisticsComponent;
  let fixture: ComponentFixture<FullDailyFlowStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullDailyFlowStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullDailyFlowStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
