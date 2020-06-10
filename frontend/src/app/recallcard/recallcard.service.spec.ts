import { TestBed } from '@angular/core/testing';

import { RecallcardService } from './recallcard.service';

describe('RecallcardService', () => {
  let service: RecallcardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecallcardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
