import {Injectable, Component, OnInit} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ShoppingBasketService} from '../../services/shopping-basket/shopping-basket.service';
import {ConfirmDeleteService} from '../../services/commons/dialog/confirm-delete.service';
import {OrderService} from "../../services/order/order.service";
import {ClientContextService} from "../../services/client-context/client-context.service";
import {Router} from "@angular/router";
import {ShoppingBasketItem} from "../../services/shopping-basket/shopping-basket-item";


@Component({
  selector: 'app-shopping-basket',
  templateUrl: './shopping-basket.component.html',
  styleUrls: ['./shopping-basket.component.scss']
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

  public ngOnInit() {
  }

  private routeToLogin() {
    this.snackBar.open('Bitte melden Sie sich zuerst an', null, {duration: 1500});
    this.clientContextService.nextRoute = 'shopping-basket';
    this.router.navigate(['my-account']).then();
  }

  confirmDelete(articleId: ShoppingBasketItem["articleID"], articleName: ShoppingBasketItem["articleName"]) {
    this.confirmDeleteService.confirm(articleName).subscribe(
      result => {
        if (result === 'ja') {
          this.removeShoppingBasketItem(articleId, articleName);
        }
      }
    );
  }

  changeItemAmount_ShoppingBasket(articleId: ShoppingBasketItem["articleID"], articleName: ShoppingBasketItem["articleName"], articleAmount: ShoppingBasketItem["articleAmount"]) {
    if (articleAmount >= 1 && articleAmount <= 3) {
      this.shoppingBasketService.changeItemAmount(articleId, articleAmount)
        .subscribe(shoppingBasket => {
            this.snackBar.open('Artikelmenge für ' + articleName + ' wurde angepasst.', null, {duration: 1500});
          }
        );
    }
    else if (articleAmount < 1) {
      this.snackBar.open('Sie können nicht 0 Bikes bestellen.', null, {duration: 1500});

    } else {
      this.snackBar.open('3 Bikes ist die maximale Bestellmenge für diesen Artikel.', null, {duration: 1500});

    }
  }

  removeShoppingBasketItem(articleId: ShoppingBasketItem["articleID"], articleName: ShoppingBasketItem["articleName"]) {
    this.shoppingBasketService.removeItem(articleId)
      .subscribe(shoppingBasket => {
        this.snackBar.open(articleName + ' aus dem Warenkorb entfernt.', null, {duration: 1500});

        }
      );
  }

  public pay() {
    if (this.clientContextService.getToken().value === '') {
      this.routeToLogin();
    } else {
      this.orderService.create(this.shoppingBasketService.shoppingBasket._id, this.clientContextService.getToken())
        .subscribe(order => {
            this.snackBar.open('Auftrag wurde erstellt', null, {duration: 1500});
            this.router.navigate(['/order-detail'], { queryParams: { id: order._id } }).then();
          },
          error => {
            if (error.status === 401) {
              this.routeToLogin();
            }
          }
        );
    }
  }


}
