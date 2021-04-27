import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullFlowStatisticsComponent } from './full-flow-statistics.component';

describe('FullFlowStatisticsComponent', () => {
  let component: FullFlowStatisticsComponent;
  let fixture: ComponentFixture<FullFlowStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullFlowStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullFlowStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
