import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISize } from '../interfaces/size.interface';


@Injectable({
  providedIn: 'root'
})
export class SizeService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/size';
  }
  
  getJSONSize(): Observable<Array<ISize>> {
    return this.http.get<Array<ISize>>(this.url);
  }
  postJSONSize(product: ISize): Observable<Array<ISize>> {
    return this.http.post<Array<ISize>>(this.url, product);
  }
  deleteJSONSize(id: number): Observable<Array<ISize>> {
    return this.http.delete<Array<ISize>>(`${this.url}/${id}`);
  }
  updateJSONSize(product: ISize): Observable<Array<ISize>> {
    return this.http.put<Array<ISize>>(`${this.url}/${product.id}`, product);
  }
}
