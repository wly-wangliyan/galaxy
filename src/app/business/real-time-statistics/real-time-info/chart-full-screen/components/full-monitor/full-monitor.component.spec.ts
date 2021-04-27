import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullMonitorComponent } from './full-monitor.component';

describe('FullMonitorComponent', () => {
  let component: FullMonitorComponent;
  let fixture: ComponentFixture<FullMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
