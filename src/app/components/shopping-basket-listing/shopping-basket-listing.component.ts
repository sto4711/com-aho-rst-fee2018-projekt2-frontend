import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import {ShoppingBasketService} from '../../services/shopping-basket/shopping-basket.service';


@Component({
  selector: 'app-shopping-basket-listing',
  templateUrl: './shopping-basket-listing.component.html',
  styleUrls: ['./shopping-basket-listing.component.scss']
})
export class ShoppingBasketListingComponent implements OnInit {
  @Input()  itemChangePossible: boolean;
  @Output() itemChange: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() deleteItem: EventEmitter<Object> = new EventEmitter<Object>();

  constructor(public shoppingBasketService: ShoppingBasketService ) { }

  ngOnInit(
  ) {
    console.log(this.itemChangePossible);
  }

  changeItemAmount_ShoppingBasket2(event, articleId , articleName ,  articleAmount )
  {
    this.itemChange.emit({articleId: articleId, articleName: articleName , articleAmount: articleAmount});
  }

  confirmDelete2(event, articleId , articleName) {
    this.deleteItem.emit({articleId: articleId, articleName: articleName } );

  }
}
