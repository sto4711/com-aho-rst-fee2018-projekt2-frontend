import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingBasketListingComponent } from './shopping-basket-listing.component';

describe('ShoppingBasketListingComponent', () => {
  let component: ShoppingBasketListingComponent;
  let fixture: ComponentFixture<ShoppingBasketListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingBasketListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingBasketListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
