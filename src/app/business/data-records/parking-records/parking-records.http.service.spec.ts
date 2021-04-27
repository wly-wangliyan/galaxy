import { TestBed, inject } from '@angular/core/testing';

import { ParkingRecords.HttpService } from './parking-records.http.service';

describe('ParkingRecords.HttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParkingRecords.HttpService]
    });
  });

  it('should be created', inject([ParkingRecords.HttpService], (service: ParkingRecords.HttpService) => {
    expect(service).toBeTruthy();
  }));
});
