import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartMonitorComponent } from './chart-monitor.component';

describe('ChartMonitorComponent', () => {
  let component: ChartMonitorComponent;
  let fixture: ComponentFixture<ChartMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
