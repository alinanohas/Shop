import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../shared/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
// import { IUser } from '../shared/interfaces/user.interface';
// import { IProduct } from '../shared/interfaces/products.interfaces';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { IProduct } from 'src/app/shared/interfaces/products.interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { CartService } from 'src/app/shared/services/cart.service';
// import { OrderService } from '../shared/services/order.service';
// import { CartService } from '../shared/services/cart.service';

@Component({
  selector: 'app-user-wishlist',
  templateUrl: './user-wishlist.component.html',
  styleUrls: ['./user-wishlist.component.scss']
})
export class UserWishlistComponent implements OnInit {

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
  sale: number = 0;
  modalRef: BsModalRef;
  product: IProduct;
  uID: any;
  id: any; dat: any;
  active : "userInfo";
  
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
    // this.getUser();
    // this.updateLocalProducts();

  }
  private getWishes() {




    const user = JSON.parse(localStorage.getItem('user'));
    const prod = JSON.parse(localStorage.getItem('wishlist'));
    console.log("prod", prod);

    // this.products = prod.filter(c => c.userID === user.id);
  
    this.products = user.wishlist;
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
  // openModal(template: TemplateRef<any>, product: IProduct) {
  //   this.modalRef = this.modalService.show(template);
  //   this.view = product
  // }
  removeWish(product: IProduct) {
    const user = JSON.parse(localStorage.getItem('user'));
    const prod = JSON.parse(localStorage.getItem('wishlist'));

    let userwishes = prod.filter(c => c.userID == user.id);

    const index = user.wishlist.findIndex(c => c.id === product.id);
    user.wishlist.splice(index, 1);
    this.products = user.wishlist;
    console.log(' user.wishlist',  user.wishlist);
    console.log(' this.products',  this.products);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('wishlist', JSON.stringify(this.products));
    
  //  this.products.splice(index, 1);
  //  user.wishlist.push(this.products);
  //   this.firestore.collection('users').doc(user.collectionId).update(user)
  //   .then(() => console.log('update success'))
  //   .catch(err => console.log('update err =', err))
  // localStorage.setItem('wishlist', JSON.stringify( user.wishlist));

  }
}
