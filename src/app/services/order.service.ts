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


  /**
   * Gets all orders
   * @returns Order[] - all orders
   */
  getAll(): Observable<Order[]> {
    const endpoint = `${environment.apiUrl}/orders`;
    return this.http.get<Order[]>(endpoint);
  }


  /**
   * Gets order by id
   * @param id - Order.IdOrder
   * @returns Order - order
   */
  getById(id: number): Observable<Order> {
    const endpoint = `${environment.apiUrl}/orders/${id}`;
    return this.http.get<Order>(endpoint);
  }


  /**
   * Gets order by user id
   * @param id - User.IdUser
   * @returns Order[] - orders
   */
  getByUserId(id: number): Observable<Order[]> {
    const endpoint = `${environment.apiUrl}/orders/user/${id}`;
    return this.http.get<Order[]>(endpoint);
  }


  /**
   * Creates order
   * @param order - Order to create
   */
  create(order: CreateOrder): Observable<unknown> {
    const endpoint = `${environment.apiUrl}/orders`;
    return this.http.post<unknown>(endpoint, order);
  }


  /**
   * Updates order
   * @param order - Order to update
   */
  update(order: UpdateOrder): Observable<unknown> {
    const endpoint = `${environment.apiUrl}/orders/${order.IdOrder}`;
    return this.http.put<unknown>(endpoint, order);
  }


  /**
   * Deletes order
   * @param id - Order.IdOrder
   */
  delete(id: number): Observable<unknown> {
    const endpoint = `${environment.apiUrl}/orders/${id}`;
    return this.http.delete<unknown>(endpoint);
  }
}
