import { TestBed, inject } from '@angular/core/testing';

import { MapMonitorVideoService } from './map-monitor-video.service';

describe('MapMonitorVideoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapMonitorVideoService]
    });
  });

  it('should be created', inject([MapMonitorVideoService], (service: MapMonitorVideoService) => {
    expect(service).toBeTruthy();
  }));
});
