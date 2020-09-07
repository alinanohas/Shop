import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/products.interfaces';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { AngularFirestore } from '@angular/fire/firestore';
import {Location} from '@angular/common';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit {

  view: IProduct = null;
  changeImage: boolean = false;
  sale: number = 0;
  status: boolean = false;
  isnotUser: boolean;

  constructor(private prService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private cartService: CartService,
    private router: Router,
    private orderService: OrderService,
    private firestore: AngularFirestore,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.getMyProduct();
    // this.qwer();
  }


  getMyProduct(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    const user = JSON.parse(localStorage.getItem('user'));
    this.prService.getOneProduct(id).subscribe(
      data => {
        this.view = data;
    
  console.log(this.view);
  
    if (user && user.wishlist) {
      user.wishlist?.forEach(el => {
        if (this.view.id === el.id) {
          this.view.status = el.status;
        }
      });
    }
  }
  );
  }

  clImage(e, view) {
    this.changeImage = true;
    const block = document.getElementById('block');
    // document.querySelector('.image-container').setAttribute("style", `background: 'url(/img/' + ${view.image[0]} + ')`);
    // document.querySelector('.image-container').innerHTML = `<img [attr.src]=${view.image[1]} > `;
    block.style.backgroundImage = `url(${e.toElement.currentSrc})`;
    console.log(e);

  }
  
  backClicked() {
    this._location.back();
  }

  getSale(product: IProduct) {
    let a = product.oldPrice - product.newPrice;
    return this.sale = a / product.oldPrice;
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
  }

  addToWish(product: IProduct) {

    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.role === "user") {
      this.status = product.status;
      product.status = true;
      let localProducts: Array<IProduct> = [];
      if (localStorage.length > 0 && localStorage.getItem('wishlist')) {
        localProducts = JSON.parse(localStorage.getItem('wishlist'));
        localStorage.setItem('wishlist', JSON.stringify(localProducts));
      }
      if (!user.wishlist) {
        user.wishlist = [];
        user.wishlist.push(product);
      }
      else {
        user.wishlist.push(product);
      }
      localStorage.setItem('user', JSON.stringify(user));

      product.userID = user.id;
      console.log('user', user);
      localProducts.push(product);
      // this.firestore.collection('users').doc(user.id).update()
      this.firestore.collection('users').doc(user.collectionId).update(user)
        .then(() => console.log('update success'))
        .catch(err => console.log('update err =', err))


      localStorage.setItem('wishlist', JSON.stringify(localProducts));

      // console.log(product);


    } if (!user) {
      this.router.navigate(['/login']);
      this.isnotUser = true;
    }

  }
  goToWish() {
    this.router.navigate(['/profile']);
  }
}
