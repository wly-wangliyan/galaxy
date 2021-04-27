import { TestBed, inject } from '@angular/core/testing';

import { UploadRecords.HttpService } from './upload-records.http.service';

describe('UploadRecords.HttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadRecords.HttpService]
    });
  });

  it('should be created', inject([UploadRecords.HttpService], (service: UploadRecords.HttpService) => {
    expect(service).toBeTruthy();
  }));
});
