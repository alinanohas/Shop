import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/products.interfaces';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Observable, of } from 'rxjs';
// import {of} from 'rxjs/add/observable/of';
import { CartService } from 'src/app/shared/services/cart.service';
import { IOrder } from 'src/app/shared/interfaces/order.interface';
import { Order } from 'src/app/shared/classes/order.model';
import { OrderService } from 'src/app/shared/services/order.service';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  totalItem: Array<number>;
  total: number;
  count: number = 1;
  item: IProduct;
  id: number;
  product: IProduct;

  user: Array<IUser> = [];
  uID: any;
  userName: string;
  userPhone: string;
  userCity: string;
  userStreet: string;
  userHouse: string;
  orders: Array<IOrder> = [];
  userComment: string;
  // public shoppingCartItems$: Observable<IProduct[]> = of([]);
  public shoppingCartItems: IProduct[];

  public products$: Observable<IProduct[]> = of([]);

  constructor(private cartService: CartService,
    private orderService: OrderService,
    private auth: AuthService,
    private firestore: AngularFirestore, ) {
  }

  ngOnInit() {
    this.shoppingCartItems = JSON.parse(localStorage.getItem('products'));
    this.getOrder();
    this.getUser();
  }


  public gettotalItem(item: IProduct) {
    let totalItem = [];
    totalItem.push(item.newPrice * item.count);
    return totalItem;
  }

  public getTotal(shoppingCartItems: IProduct[]) {
    // return this.cartService.getTotalAmount();
    let total = 0;
    for (let i in shoppingCartItems) {
      total += shoppingCartItems[i].count * shoppingCartItems[i].newPrice;
    }
    return this.total = total;
  }
  public removeItem(item: IProduct) {

    this.cartService.removeFromCart(item);
    let storageProducts = JSON.parse(localStorage.getItem('products'));
    let products = storageProducts.filter(c => c.id !== item.id);
    localStorage.setItem('products', JSON.stringify(products));
    const index = storageProducts.findIndex(c => c.id === item.id);
    this.shoppingCartItems.splice(index, 1)

  }

  addQuantity(item: IProduct, status: boolean): void {
    if (status) {
      item.count++;
    } else {
      if (item.count > 1) {
        item.count--;
      }
    }
  }
  private getOrder(): void {
    this.orderService.getJSONOrder().subscribe(
      data => {
        this.orders = data;
      }
    );
  }
  addOrder(): void {
    // debugger
    const newO: IOrder = new Order(1,
      this.userName,
      this.userPhone,
      this.userCity,
      this.userStreet,
      this.userHouse,
      this.shoppingCartItems,
      this.total,
      this.userComment,
      new Date);
    if (this.orders.length > 0) {
      newO.id = this.orders.slice(-1)[0].id + 1;
    }


    // this.orders = [];
    // localStorage.setItem('products', JSON.stringify(this.orders));
    // this.orderService.basket.next(this.orders);
    this.orderService.postJSONOrder(newO).subscribe(
      () => {
        this.getOrder();
      }
    );
    const user = JSON.parse(localStorage.getItem('user'));
    let date= new Date().toISOString().slice(0, 10);
    if (!user.shoppingCartItems) {

      user.shoppingCartItems = [];
      this.shoppingCartItems.forEach(p => {
        user.shoppingCartItems.push(p);
        user.shoppingCartItems.forEach(el => el.date = date);
      })


    }
    else {
      this.shoppingCartItems.forEach(p => {
        user.shoppingCartItems.push(p);
        user.shoppingCartItems.forEach(el => el.date = date);
      })
      console.log('user.shoppingCartItems', user.shoppingCartItems);

    }
    
    localStorage.setItem('user', JSON.stringify(user));
    console.log(user.collectionId);
    const red = user.collectionId;
    // product.userID = user.id;
    console.log('user', user);

    this.firestore.collection('users').doc(red).update(user)
      .then(() => console.log('update success'))
      .catch(err => console.log('update err =', err));

    this.resetForm();
    this.shoppingCartItems = [];
    localStorage.setItem('products', JSON.stringify(this.shoppingCartItems));
    // this.shoppingCartItems = [];
  }

  resetForm(): void {
    this.userName = '';
    this.userPhone = '';
    this.userCity = '';
    this.userStreet = '';
    this.userHouse = '';
  }

  private getUser(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
    this.firestore.collection('users').snapshotChanges().subscribe(
      collection => {
        // this.user =  
        collection.map(users => {
          const data = users.payload.doc.data() as IUser;
          const uid = users.payload.doc.id;
          data['unic'] = uid;

          if (data.id === user.id) {
            this.user.push(data);
            this.uID = uid;
            if (user.displayName &&
              user.phoneNumber &&
              user.userCity &&
              user.userStreet &&
              user.userHouse) {
              this.userName = user.displayName;
              this.userPhone = user.phoneNumber;
              this.userCity = user.userCity;
              this.userStreet = user.userStreet;
              this.userHouse = user.userHouse;
            }
          };

          console.log('data', data);
          console.log('this.user', this.user);

          return this.user;
          // return { uid, ...data };

        })
      }
    )

    }
  }

}
