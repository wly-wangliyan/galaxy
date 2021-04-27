import { TestBed, inject } from '@angular/core/testing';

import { ChartFullScreenService } from './chart-full-screen.service';

describe('ChartFullScreenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChartFullScreenService]
    });
  });

  it('should be created', inject([ChartFullScreenService], (service: ChartFullScreenService) => {
    expect(service).toBeTruthy();
  }));
});
