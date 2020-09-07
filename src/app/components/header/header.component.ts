import { Component, OnInit, HostListener } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/products.interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showDrop: boolean;
  shoppingCartItems: IProduct[];
  count: number = 0;
  statusLogin: boolean;
  urlLogin: string;
  pageLogin: string;
  getProduct: Array<IProduct> = [];
  header_change: boolean = false;


  constructor(private orderService: OrderService, private auth: AuthService, private router: Router, ) { }

  ngOnInit() {
    if (this.router.url == '/login') {
      this.header_change = true;
    }
    this.checkUser();
    this.getLocalStorage();
    this.productLength();
  }
  @HostListener("document:scroll")
  scrollfunction() {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      this.header_change = true;
    }
    else {
      this.header_change = false;
    }
  }
  navbarOpen = false;

  toggleNavbar() {
    const x = document.getElementById("myNavbar");


    this.navbarOpen = !this.navbarOpen;
    this.header_change = !this.header_change;
    if(this.navbarOpen){
    this.header_change = true;
    x.className += " responsive";

  }else {
    x.className = "navbar";
  }
}
  public myFunction() {
    const x = document.getElementById("myNavbar");
    if (x.className === "navbar") {
      x.className += " responsive";
    } else {
      x.className = "navbar";
    }
  }

  private productLength(): void {
    this.orderService.basket.subscribe(
      () => {
        this.getLocalStorage();
      }
    );
  }

  getLocalStorage() {
    if (localStorage.length > 0 && localStorage.getItem('products')) {
      this.getProduct = JSON.parse(localStorage.getItem('products'));
      return this.getProduct.length
    }
    else{
      return 0;
    }
  }

  private checkUser(): void {

    this.auth.userStatusChanges.subscribe(
      () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user !== null) {
          if (user.role === 'admin') {
            this.urlLogin = 'admin';
            this.pageLogin = 'адмін';
          }
          else {
            this.urlLogin = 'profile';
            this.pageLogin = 'кабінет';
          }
          this.statusLogin = true;
        }
        else {
          this.statusLogin = false;
          this.urlLogin = '';
          this.pageLogin = '';
        }
      }
    )
  }

  public logOut(): void {
    this.auth.logOut();
    this.auth.userStatusChanges.next('logout')
  }

}
