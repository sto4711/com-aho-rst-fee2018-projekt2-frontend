import { TestBed, inject } from '@angular/core/testing';

import { BreadcrumbTranslationService } from './breadcrumb-translation.service';

describe('BreadcrumbTranslationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BreadcrumbTranslationService]
    });
  });

  it('should be created', inject([BreadcrumbTranslationService], (service: BreadcrumbTranslationService) => {
    expect(service).toBeTruthy();
  }));
});
