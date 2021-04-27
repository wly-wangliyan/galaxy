import { TestBed, inject } from '@angular/core/testing';

import { LogHttpService } from './log-http.service';

describe('LogHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogHttpService]
    });
  });

  it('should be created', inject([LogHttpService], (service: LogHttpService) => {
    expect(service).toBeTruthy();
  }));
});
