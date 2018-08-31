import { TestBed, inject } from '@angular/core/testing';

import { ConfirmDeleteService } from './confirm-delete.service';

describe('ConfirmDeleteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfirmDeleteService]
    });
  });

  it('should be created', inject([ConfirmDeleteService], (service: ConfirmDeleteService) => {
    expect(service).toBeTruthy();
  }));
});
