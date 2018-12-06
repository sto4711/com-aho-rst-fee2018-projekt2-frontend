import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomBasketComponent } from './bottom-basket.component';

describe('BottomBasketComponent', () => {
  let component: BottomBasketComponent;
  let fixture: ComponentFixture<BottomBasketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomBasketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
