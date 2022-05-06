import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateOrderProduct, OrderProduct, UpdateOrderProduct } from '../models/order-product';

@Injectable({
  providedIn: 'root'
})
export class OrderProductService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<OrderProduct[]> {
    const endpoint = `${environment.apiUrl}/products`;
    return this.http.get<OrderProduct[]>(endpoint);
  }

  getById(id: number): Observable<OrderProduct> {
    const endpoint = `${environment.apiUrl}/products/${id}`;
    return this.http.get<OrderProduct>(endpoint);
  }

  getByOrderId(id: number): Observable<OrderProduct[]> {
    const endpoint = `${environment.apiUrl}/products/order/${id}`;
    return this.http.get<OrderProduct[]>(endpoint);
  }

  create(order: CreateOrderProduct): Observable<unknown> {
    const endpoint = `${environment.apiUrl}/products`;
    return this.http.post<unknown>(endpoint, order);
  }

  update(order: UpdateOrderProduct): Observable<unknown> {
    const endpoint = `${environment.apiUrl}/products/${order.IdOrdersProducts}`;
    return this.http.put<unknown>(endpoint, order);
  }

  delete(id: number): Observable<unknown> {
    const endpoint = `${environment.apiUrl}/products/${id}`;
    return this.http.delete<unknown>(endpoint);
  }
}
