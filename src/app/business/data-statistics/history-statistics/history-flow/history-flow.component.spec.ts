import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryFlowComponent } from './history-flow.component';

describe('HistoryFlowComponent', () => {
  let component: HistoryFlowComponent;
  let fixture: ComponentFixture<HistoryFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
