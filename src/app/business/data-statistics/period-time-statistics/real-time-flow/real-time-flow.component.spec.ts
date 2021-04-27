import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealTimeFlowComponent } from './real-time-flow.component';

describe('RealTimeFlowComponent', () => {
  let component: RealTimeFlowComponent;
  let fixture: ComponentFixture<RealTimeFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealTimeFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealTimeFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
