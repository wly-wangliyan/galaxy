import { TestBed, inject } from '@angular/core/testing';

import { RoutePreventService } from './route-prevent.service';

describe('RoutePreventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoutePreventService]
    });
  });

  it('should be created', inject([RoutePreventService], (service: RoutePreventService) => {
    expect(service).toBeTruthy();
  }));
});
