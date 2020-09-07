import { Injectable } from '@angular/core';
import { IOrder } from '../interfaces/order.interface';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  basket: Subject<any> = new Subject<any>();
  private url: string;
  private order: Array<IOrder>;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/order';
  }

  getJSONOrder(): Observable<Array<IOrder>> {
    return this.http.get<Array<IOrder>>(this.url);
  }


  postJSONOrder(order: IOrder): Observable<Array<IOrder>> {
    return this.http.post<Array<IOrder>>(this.url, order);
  }
  deleteJSONOrder(id: number): Observable<Array<IOrder>> {
    return this.http.delete<Array<IOrder>>(`${this.url}/${id}`);

  }
  updateJSONOrder(order: IOrder): Observable<Array<IOrder>> {
    return this.http.put<Array<IOrder>>(`${this.url}/${order.id}`, order);

  }
}
