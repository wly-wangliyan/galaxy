import { TestBed, inject } from '@angular/core/testing';

import { SearchSelectorService } from './search-selector.service';

describe('SearchSelectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchSelectorService]
    });
  });

  it('should be created', inject([SearchSelectorService], (service: SearchSelectorService) => {
    expect(service).toBeTruthy();
  }));
});
