import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingBasketBadgeComponent } from './shopping-basket-badge.component';

describe('ShoppingBasketBadgeComponent', () => {
  let component: ShoppingBasketBadgeComponent;
  let fixture: ComponentFixture<ShoppingBasketBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingBasketBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingBasketBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
