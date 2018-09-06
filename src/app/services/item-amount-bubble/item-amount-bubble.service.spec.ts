import { TestBed, inject } from '@angular/core/testing';

import { ItemAmountBubbleService } from './item-amount-bubble.service';

describe('ItemAmountBubbleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemAmountBubbleService]
    });
  });

  it('should be created', inject([ItemAmountBubbleService], (service: ItemAmountBubbleService) => {
    expect(service).toBeTruthy();
  }));
});
