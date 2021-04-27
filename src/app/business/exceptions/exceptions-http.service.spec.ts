import { TestBed, inject } from '@angular/core/testing';

import { ExceptionsHttpService } from './exceptions-http.service';

describe('ExceptionsHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExceptionsHttpService]
    });
  });

  it('should be created', inject([ExceptionsHttpService], (service: ExceptionsHttpService) => {
    expect(service).toBeTruthy();
  }));
});
