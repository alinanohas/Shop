import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { ProductsService } from 'src/app/shared/services/products.service';
import { IProduct } from 'src/app/shared/interfaces/products.interfaces';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lastPro: Array<any> = [];
  products: Array<IProduct> = [];
  

  constructor(private prService: ProductsService,) { }
  ngOnInit(): void {
    // FB.XFBML.parse();
    this.getBlog();
    AOS.init({
      duration: 300,
      })
  }
  private getBlog(): void {
    // const blog = this.activatedRoute.snapshot.paramMap.get('blog');
    this.prService.getJSONProducts().subscribe(
      data => {
        this.products = data;
        this.lastPro = this.products.slice(-4, -1);
      }
    );
  }
  
}
