import { TestBed, inject } from '@angular/core/testing';

import { EmployeesDataService } from './employees-data.service';

describe('EmployeesDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeesDataService]
    });
  });

  it('should be created', inject([EmployeesDataService], (service: EmployeesDataService) => {
    expect(service).toBeTruthy();
  }));
});
