import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThermodynamicChartComponent } from './thermodynamic-chart.component';

describe('ThermodynamicChartComponent', () => {
  let component: ThermodynamicChartComponent;
  let fixture: ComponentFixture<ThermodynamicChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThermodynamicChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThermodynamicChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
