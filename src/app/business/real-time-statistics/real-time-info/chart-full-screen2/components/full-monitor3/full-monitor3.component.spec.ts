import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullMonitor3Component } from './full-monitor3.component';

describe('FullMonitor3Component', () => {
  let component: FullMonitor3Component;
  let fixture: ComponentFixture<FullMonitor3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullMonitor3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullMonitor3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
