import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullMonitor2Component } from './full-monitor2.component';

describe('FullMonitor2Component', () => {
  let component: FullMonitor2Component;
  let fixture: ComponentFixture<FullMonitor2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullMonitor2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullMonitor2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
