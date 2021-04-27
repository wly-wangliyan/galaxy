import { TestBed, inject } from '@angular/core/testing';

import { BeianHttpService } from './beian-http.service';

describe('BeianHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BeianHttpService]
    });
  });

  it('should be created', inject([BeianHttpService], (service: BeianHttpService) => {
    expect(service).toBeTruthy();
  }));
});
