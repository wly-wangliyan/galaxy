import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartFlowTopsComponent } from './chart-flow-tops.component';

describe('ChartFlowTopsComponent', () => {
  let component: ChartFlowTopsComponent;
  let fixture: ComponentFixture<ChartFlowTopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartFlowTopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartFlowTopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
