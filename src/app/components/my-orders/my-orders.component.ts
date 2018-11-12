import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {OrderService} from '../../services/order/order.service';
import {Order} from '../../services/order/order';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  public p = 1;
  public orders: Order[];
  public panelOpenState = false;


  constructor(
    private userService: UserService,
    private orderService: OrderService,
  ) { }

  public ngOnInit() {
    this.orderService.getOrdersByUser(this.userService.getUser()._id)
      .subscribe(
        result => {
          this.orders = result;

        }
      );
  }

}
