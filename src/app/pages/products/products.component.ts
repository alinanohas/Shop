import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/products.interfaces';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ColorService } from 'src/app/shared/services/color.service';
import { IColor } from 'src/app/shared/interfaces/color.interface';
import { SubcategoryService } from 'src/app/shared/services/subcategory.service';
import { ISubcategory } from 'src/app/shared/interfaces/subcategory.interface';
import { ISize } from 'src/app/shared/interfaces/size.interface';
import { IVendor } from 'src/app/shared/interfaces/vendor.interface';
import { SizeService } from 'src/app/shared/services/size.service';
import { VendorService } from 'src/app/shared/services/vendor.service';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/shared/services/cart.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { IUser } from 'src/app/shared/interfaces/user.interface';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {

  modalRef: BsModalRef;
  closeResult: string;
  products: Array<IProduct> = [];
  arrColor: Array<IColor> = [];
  arrSubcategory: Array<ISubcategory> = [];
  arrSize: Array<ISize> = [];
  arrVendor: Array<IVendor> = [];
  selectedColor: Array<any> = [];
  selectedSubcat: Array<any> = [];
  selectedSize: Array<any> = [];
  selectedVendor: Array<any> = [];
  lastProduct: IProduct;
  lastPro: Array<any> = [];
  sale: number = 0;
  showDrop: boolean;

  colorID: number;
  view: IProduct;
  changeText: boolean;
  isnotUser: boolean;
  user: Array<IUser> = [];

  productListShow = [];
  productListOriginal = [];
  productListNew: Array<any> = [];
  status: boolean = false;

  page = 1;
  pageSize = 6;
  collectionSize: number;
  p: number = 1;

  public shoppingCartItems$: Observable<IProduct[]>;
  public products$: Observable<IProduct[]>;
  productAddedTocart: Array<any>;

  constructor(private prService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private subcategoryService: SubcategoryService,
    private colorService: ColorService,
    private sizeService: SizeService,
    private vendorService: VendorService,
    private route: Router,
    private modalService: BsModalService,
    private router: Router,
    private orderService: OrderService,
    private firestore: AngularFirestore,
    private cartService: CartService,
  ) {

    this.route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.getProducts();

      }
    })

  }

  ngOnInit() {

    this.getProducts();
    this.getSubcategory();
    this.getColor();
    this.getSize();
    this.getVendor();
    this.checkStatus();
  }

  private checkStatus() {
    const prod = JSON.parse(localStorage.getItem('wishlist'));
    const user = JSON.parse(localStorage.getItem('user'));
  }

  private getProducts(): void {
    const prod = JSON.parse(localStorage.getItem('wishlist'));
    const user = JSON.parse(localStorage.getItem('user'));
    const category = this.activatedRoute.snapshot.paramMap.get('category');
    this.prService.getJSONProducts().subscribe(
      data => {
        this.products = data.filter(pr => pr.category === category).reverse();
        this.lastPro = data.filter(pr => pr.category === category).slice(-3, -1);
        if (user && user.wishlist) {
          user.wishlist?.forEach(el => {

            this.products.forEach(pr => {

              if (pr.id === el.id) {
                pr.status = el.status;
              }
            });
          });
        }
      }
    );
  }

  private getSubcategory(): void {
    this.subcategoryService.getJSONSubcategory().subscribe(
      data => {
        this.arrSubcategory = data;
      }
    );
  }
  private getColor(): void {
    this.colorService.getJSONColor().subscribe(
      data => {
        this.arrColor = data;
      }
    );
  }
  private getSize(): void {
    this.sizeService.getJSONSize().subscribe(
      data => {
        this.arrSize = data;
      }
    );
  }
  private getVendor(): void {
    this.vendorService.getJSONVendor().subscribe(
      data => {
        this.arrVendor = data;
      }
    );
  }
  getSelectedCol(e, col: IColor): any {
    if (e.target.checked) {
      col.selected = true;
      this.selectedColor.push(col.colorName)

    }
    if (!e.target.checked) {
      col.selected = false;
      const index = this.selectedColor.findIndex(c => c === col.colorName);
      this.selectedColor.splice(index, 1)
    }
  }
  getSelectedSub(e, sub) {
    if (e.target.checked) {
      this.selectedSubcat.push(sub.subcategoryName)
    }
    if (!e.target.checked) {
      const index = this.selectedSubcat.findIndex(c => c === sub.subcategoryName);
      this.selectedSubcat.splice(index, 1)
    }
  }
  getSelectedSize(e, siz) {
    if (e.target.checked) {
      this.selectedSize.push(siz.sizeName)

    }
    if (!e.target.checked) {
      const index = this.selectedSize.findIndex(c => c === siz.sizeName);
      this.selectedSize.splice(index, 1)
    }
  }
  getSelectedVen(e, ven) {
    if (e.target.checked) {
      this.selectedVendor.push(ven.vendorName)

    }
    if (!e.target.checked) {
      const index = this.selectedVendor.findIndex(c => c === ven.vendorName);
      this.selectedVendor.splice(index, 1)
    }
  }

  openModal(template: TemplateRef<any>, product: IProduct) {
    this.modalRef = this.modalService.show(template);
    this.view = product
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

  checkWish(product: IProduct) {
    console.log(product);
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

    } if (!user) {
      this.router.navigate(['/login']);
      this.isnotUser = true;

    }

  }
  goToWish() {
    this.router.navigate(['/profile']);
  }
}
