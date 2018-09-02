import {Injectable, Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ShoppingBasketService} from '../../services/shopping-basket/shopping-basket.service';
import {ShoppingBasket} from '../../services/shopping-basket/shopping-basket';
import {ShoppingBasketItem} from '../../services/shopping-basket/shopping-basket-item';
import {Form} from '@angular/forms';
 import {ConfirmDeleteService} from '../../services/commons/dialog/confirm-delete.service';

@Component({
  selector: 'app-shopping-basket-play',
  templateUrl: './shopping-basket-play.component.html',
  styleUrls: ['./shopping-basket-play.component.css']
})

@Injectable({
  providedIn: 'root',
})

export class ShoppingBasketPlayComponent implements OnInit {
  public shoppingBasket: ShoppingBasket = new ShoppingBasket();
  public message: string;
  public messageSource = new BehaviorSubject<string>('0');
  currentMessage = this.messageSource.asObservable();

  constructor(
    public shoppingBasketService: ShoppingBasketService
    , private snackBar: MatSnackBar
    , public dialog: MatDialog
    , public confirmDeleteService: ConfirmDeleteService
  ) {
  }

  public ngOnInit() {
    this.checkBasketExists();
  }

  public checkBasketExists() {
    if (ShoppingBasketPlayComponent.getLocalBasketId() === null) {
      this.createShoppingBasket();
    } else {
      this.getShoppingBasket();
    }
  }

  public static getLocalBasketId() {
    return localStorage.getItem('cartId');
  }

  confirmDelete(articleId, articleName) {
    this.confirmDeleteService.confirm(articleName).subscribe(
    result => {
          if (result === 'ja') {
            this.removeShoppingBasketItem(articleId, articleName);
          }
        }
      );
  }

  createShoppingBasket() {
    this.shoppingBasketService.create()
      .subscribe(shoppingBasket => {
          this.shoppingBasket = shoppingBasket;
          localStorage.setItem('cartId', this.shoppingBasket._id);
        }
      );
  }

  getShoppingBasket() {
    this.shoppingBasketService.get(ShoppingBasketPlayComponent.getLocalBasketId())
      .subscribe(shoppingBasket => {
          this.shoppingBasket = shoppingBasket;
         this.messageSource.next((this.shoppingBasket['items'].length).toString());
         }

      );

  }

  addShoppingBasketItem(articleId, articleName, articleAmount) {
    const shoppingBasketItem = new ShoppingBasketItem(ShoppingBasketPlayComponent.getLocalBasketId(), articleId, articleAmount);
    this.shoppingBasketService.addItem(shoppingBasketItem)
      .subscribe(shoppingBasket => {
          this.shoppingBasket = shoppingBasket;
        this.messageSource.next((this.shoppingBasket['items'].length).toString());
        this.snackBar.open(articleName + ' zum Warenkorb hinzugefügt.', null, {duration: 1500});
        }
      );
  }

  changeItemAmount_ShoppingBasket(articleId, articleName, articleAmount) {
    if (articleAmount >= 1 && articleAmount <= 3) {
       const shoppingBasketItem = new ShoppingBasketItem(ShoppingBasketPlayComponent.getLocalBasketId(), articleId, articleAmount);

      this.shoppingBasketService.changeItemAmount(shoppingBasketItem)
        .subscribe(shoppingBasket => {
            this.shoppingBasket = shoppingBasket;

          this.snackBar.open('Artikelmenge für ' + articleName + ' ist angepasst.', null, {duration: 1500});
          }
        );
    }
    if (articleAmount < 1) {
      this.snackBar.open(   'Sie können nicht 0 Bikes bestellen.', null, {duration: 1500});

    } else {
      this.snackBar.open(   '3 Bikes ist die maximale Bestellmenge für diesen Artikel.', null, {duration: 1500});

    }

  }

  removeShoppingBasketItem(articleId, articleName) {
    this.shoppingBasketService.removeItem(new ShoppingBasketItem(ShoppingBasketPlayComponent.getLocalBasketId(), articleId, 0))
      .subscribe(shoppingBasket => {
          this.shoppingBasket = shoppingBasket;
          console.log(this.shoppingBasket);
        this.messageSource.next((this.shoppingBasket['items'].length).toString());
        this.snackBar.open(articleName + ' aus dem Warenkorb entfernt.', null, {duration: 1500});

        }
      );
  }

}
