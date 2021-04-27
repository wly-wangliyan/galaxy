import { TestBed, inject } from '@angular/core/testing';

import { DataStatisticsHttpService } from './data-statistics-http.service';

describe('DataStatisticsHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataStatisticsHttpService]
    });
  });

  it('should be created', inject([DataStatisticsHttpService], (service: DataStatisticsHttpService) => {
    expect(service).toBeTruthy();
  }));
});
