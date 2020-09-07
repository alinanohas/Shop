import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IProduct } from '../interfaces/products.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  private url: string;
  private products:Array<IProduct>;

  constructor(private http: HttpClient ) { 
    this.url = 'http://localhost:3000/products';
  }

  getJSONProducts(): Observable<Array<IProduct>> {
    return this.http.get<Array<any>>(this.url);
  }


  postJSONProducts(product: IProduct):Observable<Array<IProduct>>{
    return this.http.post<Array<IProduct>>(this.url, product);
  }


  deleteJSONProducts(id: number):Observable<Array<IProduct>>{
    return this.http.delete<Array<IProduct>>(`${this.url}/${id}`);

  }
  updateJSONProducts(product: IProduct):Observable<Array<IProduct>>{
    return this.http.put<Array<IProduct>>(`${this.url}/${product.id}`, product);

  }
  getOneProduct(id: number):Observable<IProduct>{
    return this.http.get<IProduct>(`${this.url}/${id}`);
  }
 
}
