import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCounterBgComponent } from './chart-counter-bg.component';

describe('ChartCounterBgComponent', () => {
  let component: ChartCounterBgComponent;
  let fixture: ComponentFixture<ChartCounterBgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartCounterBgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartCounterBgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
