import { TestBed, inject } from '@angular/core/testing';

import { OperationCompanyDataService } from './operation-company-data.service';

describe('OperationCompanyDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OperationCompanyDataService]
    });
  });

  it('should be created', inject([OperationCompanyDataService], (service: OperationCompanyDataService) => {
    expect(service).toBeTruthy();
  }));
});
