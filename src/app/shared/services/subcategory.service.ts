import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISubcategory } from '../interfaces/subcategory.interface';
import { ICategory } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/subcategory';
  }
  
  getJSONSubcategory(): Observable<Array<ISubcategory>> {
    return this.http.get<Array<ISubcategory>>(this.url);
  }
  postJSONSubcategory(product: ISubcategory): Observable<Array<ISubcategory>> {
    return this.http.post<Array<ISubcategory>>(this.url, product);
  }
  deleteJSONSubcategory(id: number): Observable<Array<ISubcategory>> {
    return this.http.delete<Array<ISubcategory>>(`${this.url}/${id}`);
  }
  updateJSONSubcategory(product: ISubcategory): Observable<Array<ISubcategory>> {
    return this.http.put<Array<ISubcategory>>(`${this.url}/${product.id}`, product);
  }
}
