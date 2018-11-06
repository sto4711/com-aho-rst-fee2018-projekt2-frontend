import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import {ShoppingBasketService} from '../../services/shopping-basket/shopping-basket.service';
import {LangService} from '../../services/lang-service/lang.service';
 import {Order} from '../../services/order/order';

@Component({
  selector: 'app-shopping-basket-listing',
  templateUrl: './shopping-basket-listing.component.html',
  styleUrls: ['./shopping-basket-listing.component.scss']
})
export class ShoppingBasketListingComponent implements OnInit {
  @Input()  itemChangePossible: boolean;
  @Input()  isCheckout: boolean;
  @Input()  order: Order;
  @Output() itemChange: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() deleteItem: EventEmitter<Object> = new EventEmitter<Object>();
  private langSwitch: boolean;
  constructor(
      public shoppingBasketService: ShoppingBasketService
    , private langService: LangService
  ) {

     this.langSwitch = true;
    this.langService.getLanguage().subscribe(() => {
      this.langSwitch = !this.langSwitch;
    });

   }

  ngOnInit( ) { }

  changeItemAmount_ShoppingBasket(event, articleId , articleName ,  articleAmount ) {
    this.itemChange.emit({articleId: articleId, articleName: articleName , articleAmount: articleAmount});
  }

  confirmDelete(event, articleId , articleName) {
    this.deleteItem.emit({articleId: articleId, articleName: articleName } );

  }
}
