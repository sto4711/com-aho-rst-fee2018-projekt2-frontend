import { TestBed, inject } from '@angular/core/testing';

import { LangService } from './lang.service';

describe('LangServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LangService]
    });
  });

  it('should be created', inject([LangService], (service: LangService) => {
    expect(service).toBeTruthy();
  }));
});
