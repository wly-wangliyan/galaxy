import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RealTimeStatisticsComponent} from './real-time-statistics.component';

describe('LiveComponent', () => {
  let component: RealTimeStatisticsComponent;
  let fixture: ComponentFixture<RealTimeStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RealTimeStatisticsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealTimeStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
