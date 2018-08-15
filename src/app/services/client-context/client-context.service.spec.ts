import { TestBed, inject } from '@angular/core/testing';

import { ClientContextService } from './client-context.service';

describe('ClientContextService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientContextService]
    });
  });

  it('should be created', inject([ClientContextService], (service: ClientContextService) => {
    expect(service).toBeTruthy();
  }));
});
