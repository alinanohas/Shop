import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject, Subscriber} from 'rxjs';
import { map } from 'rxjs/operators';
// import {of} from 'rxjs/add/observable/of';
import { IProduct } from '../interfaces/products.interfaces';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  private itemsInCartSubject: BehaviorSubject<IProduct[]> = new BehaviorSubject([]);
  // private itemsInCartSubject = new BehaviorSubject<IProduct[]>([]);
  private itemsInCart: IProduct[] = [];

  constructor() {
    
    this.itemsInCartSubject.subscribe(_ => this.itemsInCart = _);
  }
  public addToCart(item: IProduct) {
    
    this.itemsInCartSubject.next([...this.itemsInCart, item]);
    // return localStorage.setItem("product", JSON.stringify(item));
  }
  public removeFromCart(item: IProduct) { 

    const currentItems = [...this.itemsInCart];
    const itemsWithoutRemoved = currentItems.filter(_ => _.id !== item.id);
    this.itemsInCartSubject.next(itemsWithoutRemoved);
    return JSON.parse(localStorage.getItem('item'));

  }
  public getItems() {
     this.itemsInCartSubject;
    return JSON.parse(localStorage.getItem('products'));
   
  }
  // public getItems(): Observable<IProduct[]> {
  //   return this.itemsInCartSubject;
  // }
  public getTotalAmount(): Observable<number> {
    return this.itemsInCartSubject.pipe(map((items: IProduct[]) => {
      return items.reduce((prev, curr: IProduct) => {
        return prev + curr.newPrice;
      }, 0);
    }));
  }
}
