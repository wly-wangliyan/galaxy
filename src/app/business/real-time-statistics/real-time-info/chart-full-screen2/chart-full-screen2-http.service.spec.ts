import { TestBed, inject } from '@angular/core/testing';

import { ChartFullScreen2HttpService } from './chart-full-screen2-http.service';

describe('ChartFullScreen2HttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChartFullScreen2HttpService]
    });
  });

  it('should be created', inject([ChartFullScreen2HttpService], (service: ChartFullScreen2HttpService) => {
    expect(service).toBeTruthy();
  }));
});
