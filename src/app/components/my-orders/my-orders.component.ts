import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {OrderService} from '../../services/order/order.service';
import {TranslateService} from '@ngx-translate/core';
import {LangService} from '../../services/lang-service/lang.service';
import {SnackBarService} from '../../services/commons/snack-bar/snack-bar.service';
import {User} from '../../services/user/user';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  public p: number = 1;
  public orders$: object = [];
  public panelOpenState: boolean = false;


  constructor(
    private userService: UserService,
    private orderService: OrderService,
  ) {
  }

  ngOnInit() {
    this.orders$ = this.orderService.getOrdersByUser(this.userService.getUser()._id);
  }
}
