import { TestBed, inject } from '@angular/core/testing';

import { EmployeesHttpService } from './employees-http.service';

describe('EmployeesHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeesHttpService]
    });
  });

  it('should be created', inject([EmployeesHttpService], (service: EmployeesHttpService) => {
    expect(service).toBeTruthy();
  }));
});
