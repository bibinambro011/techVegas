import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  count: number = 0
  private countSubject: BehaviorSubject<number> = new BehaviorSubject(this.count);

  constructor(private http: HttpClient) { }
  
  categoryapi=environment.categoryapi
  productByCategory=environment.productByCategory
  allproducts=environment.allproducts

  loadcatgory(): Observable<any> {
    return this.http.get<any>(this.categoryapi)
  };

  showcat(cat: string): Observable<any> {
    return this.http.get<any>(`${this.productByCategory}/${cat}`)
  }

  showallproduct(): Observable<any> {
    return this.http.get<any>(`${this.allproducts}`)
  }

  showSelectedProduct(id: string): Observable<any> {
    return this.http.get<any>(`${this.allproducts}/${id}`)
  }



  addToCart(): void {
    this.count++;
    this.countSubject.next(this.count); // Emit the new count
  }

  getCount(): Observable<number> {
    return this.countSubject.asObservable(); // Expose the count as an observable
  }
}
