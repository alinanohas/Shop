import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IVendor } from '../interfaces/vendor.interface';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/vendor';
  }
  
  getJSONVendor(): Observable<Array<IVendor>> {
    return this.http.get<Array<IVendor>>(this.url);
  }
  postJSONVendor(product: IVendor): Observable<Array<IVendor>> {
    return this.http.post<Array<IVendor>>(this.url, product);
  }
  deleteJSONVendor(id: number): Observable<Array<IVendor>> {
    return this.http.delete<Array<IVendor>>(`${this.url}/${id}`);
  }
  updateJSONVendor(product: IVendor): Observable<Array<IVendor>> {
    return this.http.put<Array<IVendor>>(`${this.url}/${product.id}`, product);
  }
}
