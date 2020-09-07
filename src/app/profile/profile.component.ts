import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { IUser } from '../shared/interfaces/user.interface';
import { IProduct } from '../shared/interfaces/products.interfaces';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { OrderService } from '../shared/services/order.service';
import { CartService } from '../shared/services/cart.service';
import { Product } from '../shared/classes/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userID: any;
  userName: string;
  userEmail: string;
  userPassword: string;
  userPhone: string;
  userCity: string;
  userStreet: string;
  userHouse: string;
  public currentUser: any;
  password: string;
  email: string;
  user: Array<IUser> = [];
  products: Array<any> = [];
  orders: Array<any> = [];
  sale: number = 0;
  modalRef: BsModalRef;
  product: IProduct;
  uID: any;
  id: any; dat: any;
  active: "userWishList";
  isOrders: boolean;

  constructor(private auth: AuthService,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private modalService: BsModalService,
    private router: Router,
    private orderService: OrderService,
    private authService: AuthService,
    private cartService: CartService, ) { }

  ngOnInit(): void {

    this.getWishes();
    this.getUser();
    this.updateLocalProducts();
    console.log('this.user2', this.user);


  }
  private getWishes() {




    const user = JSON.parse(localStorage.getItem('user'));
    const prod = JSON.parse(localStorage.getItem('wishlist'));
    console.log("prod", prod);

    // this.products = prod.filter(c => c.userID === user.id);
  
    this.products = user.wishlist;
    this.isOrders = false;

    if(user.shoppingCartItems){
    
      // user.shoppingCartItems.forEach(el => {
      //   this.orders.push(el);
      // });
      this.orders = user.shoppingCartItems;
      this.isOrders = true;
    }
  }

  public logOut(): void {
    this.auth.logOut();
    this.auth.userStatusChanges.next('logout')
  }

  private getUser(): void {

    this.firestore.collection('users').snapshotChanges().subscribe(
      collection => {
        // this.user =  
        collection.map(users => {
          const data = users.payload.doc.data() as IUser;
          const uid = users.payload.doc.id;
          const user = JSON.parse(localStorage.getItem('user'));

          data['unic'] = uid;

          if (data.id === user.id) {
            this.uID = uid;
            this.user.push(data);
          
          };

          console.log('data', data);
          console.log('this.user', this.user);

          // return this.user;
          // return { uid, ...data };

        })
      }
    )


  }

  addInfo(): void {

    const user = JSON.parse(localStorage.getItem('user'));
    const curID = document.querySelector('#uID').innerHTML;


    const users = {
      displayName: this.userName,
      phoneNumber: this.userPhone,
      userCity: this.userCity,
      userStreet: this.userStreet,
      userHouse: this.userHouse,
    };

    this.firestore.doc('users/' + this.uID).update(users);
    this.user = [];
  }

  public addToCart(product: IProduct) {
    let localProducts: Array<IProduct> = [];
    if (localStorage.length > 0 && localStorage.getItem('products')) {
      localProducts = JSON.parse(localStorage.getItem('products'));
      if (localProducts.some(prod => prod.id === product.id)) {
        const index = localProducts.findIndex(prod => prod.id === product.id);
        localProducts[index].count += product.count;
      } else {
        localProducts.push(product);
      }
      localStorage.setItem('products', JSON.stringify(localProducts));
    } else {
      localProducts.push(product);
      localStorage.setItem('products', JSON.stringify(localProducts));
    }
    product.count = 1;
    this.cartService.addToCart(product);
    this.router.navigateByUrl('/basket');
    this.orderService.basket.next(localProducts);
    this.modalRef?.hide()

  }
  getSale(product: IProduct) {
    let a = product.oldPrice - product.newPrice;
    return this.sale = a / product.oldPrice;
  }

  removeWish(product: IProduct) {
    const user = JSON.parse(localStorage.getItem('user'));
    const prod = JSON.parse(localStorage.getItem('wishlist'));
    const index = user.wishlist.findIndex(c => c.id === product.id);
    user.wishlist.splice(index, 1);
    this.products = user.wishlist;
    console.log(' user.wishlist', user.wishlist);
    console.log(' this.products', this.products);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('wishlist', JSON.stringify(this.products));
  }

  private updateLocalProducts(): void {
    let storageProducts = JSON.parse(localStorage.getItem('wishlist'));
    localStorage.setItem('wishlist', JSON.stringify(storageProducts));
  }
}