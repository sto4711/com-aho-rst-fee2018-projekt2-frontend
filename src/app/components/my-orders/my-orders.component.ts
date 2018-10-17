import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {OrderService} from '../../services/order/order.service';
import {Order} from "../../services/order/order";

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  public p: number = 1;
  public orders: Order[];
  public panelOpenState: boolean = false;


  constructor(
    private userService: UserService,
    private orderService: OrderService,
  ) {
  }

  ngOnInit() {
    this.orderService.getOrdersByUser(this.userService.getUser()._id)
      .subscribe(
        result => {
          this.orders = result;
        }
      );
  }
}
