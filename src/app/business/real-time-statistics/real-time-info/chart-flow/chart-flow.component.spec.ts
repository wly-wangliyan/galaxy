import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartFlowComponent } from './chart-flow.component';

describe('ChartFlowComponent', () => {
  let component: ChartFlowComponent;
  let fixture: ComponentFixture<ChartFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
