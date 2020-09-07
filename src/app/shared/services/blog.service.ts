import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBlog } from '../interfaces/blog.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/blog';
  }
  
  getJSONBlog(): Observable<Array<IBlog>> {
    return this.http.get<Array<IBlog>>(this.url);
  }
  postJSONBlog(product: IBlog): Observable<Array<IBlog>> {
    return this.http.post<Array<IBlog>>(this.url, product);
  }
  deleteJSONBlog(id: number): Observable<Array<IBlog>> {
    return this.http.delete<Array<IBlog>>(`${this.url}/${id}`);
  }
  updateJSONBlog(product: IBlog): Observable<Array<IBlog>> {
    return this.http.put<Array<IBlog>>(`${this.url}/${product.id}`, product);
  }
  getOneBlog(id: number):Observable<IBlog>{
    return this.http.get<IBlog>(`${this.url}/${id}`);
  }
}
