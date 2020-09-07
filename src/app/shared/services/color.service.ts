import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IColor } from '../interfaces/color.interface';

@Injectable({
  providedIn: 'root'
})
export class ColorService {


  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/color';
  }
  
  getJSONColor(): Observable<Array<IColor>> {
    return this.http.get<Array<IColor>>(this.url);
  }
  postJSONColor(product: IColor): Observable<Array<IColor>> {
    return this.http.post<Array<IColor>>(this.url, product);
  }
  deleteJSONColor(id: number): Observable<Array<IColor>> {
    return this.http.delete<Array<IColor>>(`${this.url}/${id}`);
  }
  updateJSONColor(product: IColor): Observable<Array<IColor>> {
    return this.http.put<Array<IColor>>(`${this.url}/${product.id}`, product);
  }
  
}
