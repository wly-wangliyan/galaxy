import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartOnlineStateComponent } from './chart-online-state.component';

describe('ChartOnlineStateComponent', () => {
  let component: ChartOnlineStateComponent;
  let fixture: ComponentFixture<ChartOnlineStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartOnlineStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartOnlineStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
