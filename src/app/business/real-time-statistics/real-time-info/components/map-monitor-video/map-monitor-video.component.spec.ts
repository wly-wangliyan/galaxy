import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapMonitorVideoComponent } from './map-monitor-video.component';

describe('MapMonitorVideoComponent', () => {
  let component: MapMonitorVideoComponent;
  let fixture: ComponentFixture<MapMonitorVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapMonitorVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapMonitorVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
