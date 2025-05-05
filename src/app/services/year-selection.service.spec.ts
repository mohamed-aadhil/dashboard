import { TestBed } from '@angular/core/testing';

import { YearSelectionService } from './year-selection.service';

describe('YearSelectionService', () => {
  let service: YearSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YearSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
