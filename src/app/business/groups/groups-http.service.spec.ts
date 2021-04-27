import { TestBed, inject } from '@angular/core/testing';

import { GroupsHttpService } from './groups-http.service';

describe('GroupsHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupsHttpService]
    });
  });

  it('should be created', inject([GroupsHttpService], (service: GroupsHttpService) => {
    expect(service).toBeTruthy();
  }));
});
