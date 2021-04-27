import { TestBed, inject } from '@angular/core/testing';

import { GroupsDataService } from './groups-data.service';

describe('GroupsDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupsDataService]
    });
  });

  it('should be created', inject([GroupsDataService], (service: GroupsDataService) => {
    expect(service).toBeTruthy();
  }));
});
