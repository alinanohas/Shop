import { Component, OnInit, TemplateRef } from '@angular/core';
import { IOrder } from 'src/app/shared/interfaces/order.interface';
import { OrderService } from 'src/app/shared/services/order.service';
import { IProduct } from 'src/app/shared/interfaces/products.interfaces';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  orders: Array<IOrder> = [];
  ordersDetails: Array<IProduct> = [];
  modalRef: BsModalRef;
  view: IProduct;
  sale: number = 0;
  constructor(private orderService: OrderService,
    private router: Router,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    this.getOrders();

  }

  private getOrders() {
    this.orderService.getJSONOrder().subscribe(
      data => {
        this.orders = data;
      }
    )
  }
  deleteProduct(order: IOrder): void {
    this.orderService.deleteJSONOrder(order.id).subscribe(
      () => {
        this.getOrders();
      }
    )
  }
  openModal(template: TemplateRef<any>, product: IProduct) {
    this.modalRef = this.modalService.show(template);
    this.view = product;
    // this.router.navigateByUrl(`/shop/${this.view.category}`);
  }
  getSale(product: IProduct) {
    let a = product.oldPrice - product.newPrice;
    return this.sale = a / product.oldPrice;
  }

}

