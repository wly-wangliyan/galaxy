import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCounterComponent } from './chart-counter.component';

describe('ChartCounterComponent', () => {
  let component: ChartCounterComponent;
  let fixture: ComponentFixture<ChartCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartCounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
