import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import {ShoppingBasketService} from '../../services/shopping-basket/shopping-basket.service';
import {LangService} from '../../services/lang-service/lang.service';

@Component({
  selector: 'app-shopping-basket-listing',
  templateUrl: './shopping-basket-listing.component.html',
  styleUrls: ['./shopping-basket-listing.component.scss']
})
export class ShoppingBasketListingComponent implements OnInit {
  @Input()  itemChangePossible: boolean;
  @Output() itemChange: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() deleteItem: EventEmitter<Object> = new EventEmitter<Object>();

   langSwitch: boolean;
  constructor(
      public shoppingBasketService: ShoppingBasketService
    , private langService: LangService
  ) {

     this.langSwitch = true;
    this.langService.getLanguage().subscribe(language => {
      this.langSwitch = !this.langSwitch;
    });

   }

  ngOnInit( ) { }

  changeItemAmount_ShoppingBasket2(event, articleId , articleName ,  articleAmount )
  {
    this.itemChange.emit({articleId: articleId, articleName: articleName , articleAmount: articleAmount});
  }

  confirmDelete2(event, articleId , articleName) {
    this.deleteItem.emit({articleId: articleId, articleName: articleName } );

  }
}
