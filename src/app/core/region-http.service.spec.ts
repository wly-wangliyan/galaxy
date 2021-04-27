import { TestBed, inject } from '@angular/core/testing';

import { RegionHttpService } from './region-http.service';

describe('RegionHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegionHttpService]
    });
  });

  it('should be created', inject([RegionHttpService], (service: RegionHttpService) => {
    expect(service).toBeTruthy();
  }));
});
