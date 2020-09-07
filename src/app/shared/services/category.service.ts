import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/category';
  }
  
  getJSONCategory(): Observable<Array<ICategory>> {
    return this.http.get<Array<ICategory>>(this.url);
  }
  postJSONCategory(product: ICategory): Observable<Array<ICategory>> {
    return this.http.post<Array<ICategory>>(this.url, product);
  }
  deleteJSONCategory(id: number): Observable<Array<ICategory>> {
    return this.http.delete<Array<ICategory>>(`${this.url}/${id}`);
  }
  updateJSONCategory(product: ICategory): Observable<Array<ICategory>> {
    return this.http.put<Array<ICategory>>(`${this.url}/${product.id}`, product);
  }
}


