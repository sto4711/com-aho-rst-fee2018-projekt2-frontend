import {Injectable, Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import {ShoppingBasketService} from '../../services/shopping-basket/shopping-basket.service';
 import {ConfirmDeleteService} from '../../services/commons/dialog/confirm-delete.service';
import {OrderService} from "../../services/order/order.service";
import {ClientContextService} from "../../services/client-context/client-context.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-shopping-basket',
  templateUrl: './shopping-basket.component.html',
  styleUrls: ['./shopping-basket.component.css']
})

@Injectable({
  providedIn: 'root',
})

export class ShoppingBasketComponent implements OnInit {

  constructor(
    public shoppingBasketService: ShoppingBasketService
    , private snackBar: MatSnackBar
    , public dialog: MatDialog
    , public confirmDeleteService: ConfirmDeleteService
    , private clientContextService: ClientContextService
    , private router: Router
    , private orderService: OrderService
  ) {
  }

  public ngOnInit() {}

  private routeToLogin() {
    this.snackBar.open('Bitte melden Sie sich zuerst an', null, {duration: 1500});
    this.clientContextService.nextRoute = 'shopping-basket';
    this.router.navigate(['my-account']).then();
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

  changeItemAmount_ShoppingBasket(articleId, articleName, articleAmount) {
    console.log('changeItemAmount_ShoppingBasket() -> NOT YET IMPLEMENTED!');
    // if (articleAmount >= 1 && articleAmount <= 3) {
    //    const shoppingBasketItem = new ShoppingBasketItem(ShoppingBasketComponent.getLocalBasketId(), articleId, articleAmount);
    //
    //   this.shoppingBasketService.changeItemAmount(shoppingBasketItem)
    //     .subscribe(shoppingBasket => {
    //         this.shoppingBasket = shoppingBasket;
    //
    //       this.snackBar.open('Artikelmenge für ' + articleName + ' ist angepasst.', null, {duration: 1500});
    //       }
    //     );
    // }
    // if (articleAmount < 1) {
    //   this.snackBar.open(   'Sie können nicht 0 Bikes bestellen.', null, {duration: 1500});
    //
    // } else {
    //   this.snackBar.open(   '3 Bikes ist die maximale Bestellmenge für diesen Artikel.', null, {duration: 1500});
    //
    // }
  }

  removeShoppingBasketItem(articleId, articleName) {
    console.log('removeShoppingBasketItem() -> NOT YET IMPLEMENTED!');
    // this.shoppingBasketService.removeItem(new ShoppingBasketItem(ShoppingBasketComponent.getLocalBasketId(), articleId, 0))
    //   .subscribe(shoppingBasket => {
    //       this.shoppingBasket = shoppingBasket;
    //       console.log(this.shoppingBasket.items.length);
    //
    //       this.messageSource.next((this.shoppingBasket.items.length).toString());
    //       console.log(this.messageSource);
    //     this.snackBar.open(articleName + ' aus dem Warenkorb entfernt.', null, {duration: 1500});
    //
    //     }
    //   );
  }

  public pay() {
    console.log('pay() -> NOT YET IMPLEMENTED!');

    // if (this.clientContextService.getToken().value === '') {
    //   this.routeToLogin();
    // } else {
    //   this.orderService.create(this.shoppingBasket._id, this.clientContextService.getToken())
    //     .subscribe(order => {
    //         this.snackBar.open('Auftrag wurde erstellt', null, {duration: 1500});
    //         this.router.navigate(['/order-detail'], { queryParams: { id: order._id } }).then();
    //       },
    //       error => {
    //         if (error.status === 401) {
    //           this.routeToLogin();
    //         }
    //       }
    //     );
    // }
  }


}
