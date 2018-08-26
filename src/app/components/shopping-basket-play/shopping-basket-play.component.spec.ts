import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingBasketPlayComponent } from './shopping-basket-play.component';

describe('ShoppingBasketPlayComponent', () => {
  let component: ShoppingBasketPlayComponent;
  let fixture: ComponentFixture<ShoppingBasketPlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingBasketPlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingBasketPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
