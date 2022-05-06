import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateOrder, Order, UpdateOrder } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Order[]> {
    const endpoint = `${environment.apiUrl}/orders`;
    return this.http.get<Order[]>(endpoint);
  }

  getById(id: number): Observable<Order> {
    const endpoint = `${environment.apiUrl}/orders/${id}`;
    return this.http.get<Order>(endpoint);
  }

  getByUserId(id: number): Observable<Order[]> {
    const endpoint = `${environment.apiUrl}/orders/user/${id}`;
    return this.http.get<Order[]>(endpoint);
  }

  create(order: CreateOrder): Observable<unknown> {
    const endpoint = `${environment.apiUrl}/orders`;
    return this.http.post<unknown>(endpoint, order);
  }

  update(order: UpdateOrder): Observable<unknown> {
    const endpoint = `${environment.apiUrl}/orders/${order.IdOrder}`;
    return this.http.put<unknown>(endpoint, order);
  }

  delete(id: number): Observable<unknown> {
    const endpoint = `${environment.apiUrl}/orders/${id}`;
    return this.http.delete<unknown>(endpoint);
  }
}
