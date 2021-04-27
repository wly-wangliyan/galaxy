import { TestBed, inject } from '@angular/core/testing';

import { ManufacturerHttpService } from './manufacturer-http.service';

describe('ManufacturerHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManufacturerHttpService]
    });
  });

  it('should be created', inject([ManufacturerHttpService], (service: ManufacturerHttpService) => {
    expect(service).toBeTruthy();
  }));
});
