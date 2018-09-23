import {Injectable, Component, OnInit} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ShoppingBasketService} from '../../services/shopping-basket/shopping-basket.service';
import {ConfirmDeleteService} from '../../services/commons/dialog/confirm-delete.service';
import {OrderService} from '../../services/order/order.service';
import {ClientContextService} from '../../services/client-context/client-context.service';
import {Router} from '@angular/router';
import {ShoppingBasketItem} from '../../services/shopping-basket/shopping-basket-item';
import {TranslateService} from '@ngx-translate/core';
import {SnackBarService} from "../../services/commons/snack-bar/snack-bar.service";


@Component({
  selector: 'app-shopping-basket',
  templateUrl: './shopping-basket.component.html',
  styleUrls: ['./shopping-basket.component.scss']
})

@Injectable({
  providedIn: 'root',
})

export class ShoppingBasketComponent {
  public itemChangePossible = true;
  private static CODE_TRANSLATION_REMOVED = 'REMOVED-FROM-SHOPPING-BASKET';
  private static CODE_TRANSLATION_REMOVE_FOR_SURE = 'TO-REMOVE-FROM-SHOPPING-BASKET-FOR-SURE';
  private static CODE_TRANSLATION_MIN_QUANTITY = 'MINIMUM-ORDER-QUANTITY-IS';
  private static CODE_TRANSLATION_MAX_QUANTITY = 'MAXIMUM-ORDER-QUANTITY-IS';
  private static CODE_TRANSLATION_AMOUNT_CHANGED = 'ARTICLE-AMOUNT-CHANGED';


  constructor(
    public shoppingBasketService: ShoppingBasketService
    , public confirmDeleteService: ConfirmDeleteService
    , private snackBar: MatSnackBar
    ,private snackBarService: SnackBarService
    , private clientContextService: ClientContextService
    , private router: Router
    , private orderService: OrderService
    , private translate: TranslateService
  ) {
  }

  confirmDelete(articleId: ShoppingBasketItem["articleID"], articleName: ShoppingBasketItem["articleName"]) {
    this.translate.get(ShoppingBasketComponent.CODE_TRANSLATION_REMOVE_FOR_SURE).subscribe(translated => {
        const confirmTitle = articleName + ' ' + translated;
        this.confirmDeleteService.confirm(confirmTitle).subscribe(
          result => {
            if (result === 'yes') {
              this.removeShoppingBasketItem(articleId, articleName);
            }
          }
        );
      }
    );
  }

  changeItemAmount_ShoppingBasket(articleId: ShoppingBasketItem["articleID"], articleName: ShoppingBasketItem["articleName"], articleAmount: ShoppingBasketItem["articleAmount"]) {
    if (articleAmount >= 1 && articleAmount <= 3) {
      this.shoppingBasketService.changeItemAmount(articleId, articleAmount)
        .subscribe(shoppingBasket => {

          this.snackBarService.showInfo(ShoppingBasketComponent.CODE_TRANSLATION_AMOUNT_CHANGED);



            // this.translate.get(ShoppingBasketComponent.CODE_TRANSLATION_AMOUNT_CHANGED).subscribe(translated => {
            //     this.snackBar.open(translated, null, {duration: 2500, panelClass: 'snackbar'});
            //   }
            // );
          }
        );
    }
    else if (articleAmount < 1) {
      this.translate.get(ShoppingBasketComponent.CODE_TRANSLATION_MIN_QUANTITY).subscribe(translated => {
          this.snackBar.open(translated + ' 1', null, {duration: 2500, panelClass: 'snackbar'});
        }
      );
    } else {
      this.translate.get(ShoppingBasketComponent.CODE_TRANSLATION_MAX_QUANTITY).subscribe(translated => {
          this.snackBar.open(translated + ' 3', null, {duration: 2500, panelClass: 'snackbar'});
        }
      );
    }
  }

  removeShoppingBasketItem(articleId: ShoppingBasketItem["articleID"], articleName: ShoppingBasketItem["articleName"]) {
    this.shoppingBasketService.removeItem(articleId)
      .subscribe(shoppingBasket => {
          this.translate.get(ShoppingBasketComponent.CODE_TRANSLATION_REMOVED).subscribe(translated => {
              this.snackBar.open(articleName + ' ' + translated, null, {duration: 2500, panelClass: 'snackbar'});
            }
          );
        }
      );
  }


}

