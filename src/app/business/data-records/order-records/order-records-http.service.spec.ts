import { TestBed, inject } from '@angular/core/testing';

import { OrderRecordsHttpService } from './order-records-http.service';

describe('OrderRecordsHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderRecordsHttpService]
    });
  });

  it('should be created', inject([OrderRecordsHttpService], (service: OrderRecordsHttpService) => {
    expect(service).toBeTruthy();
  }));
});
