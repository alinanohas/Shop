import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { OrderService } from '../shared/services/order.service';
import { IOrder } from '../shared/interfaces/order.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  orders: Array<IOrder> = [];

  constructor(private auth: AuthService,private orderService: OrderService,) { }

  ngOnInit(): void {
   this.getOrders();
  }

  public logOut(): void {
    this.auth.logOut();
    this.auth.userStatusChanges.next('logout')
  }
  private getOrders() {
    this.orderService.getJSONOrder().subscribe(
      data => {
        this.orders = data;
      }
    ) 
  }


}
