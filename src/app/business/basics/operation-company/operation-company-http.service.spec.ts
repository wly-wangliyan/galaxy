import { TestBed, inject } from '@angular/core/testing';

import { OperationCompanyHttpService } from './operation-company-http.service';

describe('OperationCompanyHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OperationCompanyHttpService]
    });
  });

  it('should be created', inject([OperationCompanyHttpService], (service: OperationCompanyHttpService) => {
    expect(service).toBeTruthy();
  }));
});
