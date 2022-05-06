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


  /**
   * Gets all products
   * @returns OrderProduct[] - all products
   */
  getAll(): Observable<OrderProduct[]> {
    const endpoint = `${environment.apiUrl}/products`;
    return this.http.get<OrderProduct[]>(endpoint);
  }


  /**
   * Gets products by id
   * @param id - OrderProduct.IdOrdersProducts
   * @returns OrderProduct - product
   */
  getById(id: number): Observable<OrderProduct> {
    const endpoint = `${environment.apiUrl}/products/${id}`;
    return this.http.get<OrderProduct>(endpoint);
  }


  /**
   * Gets products by order id
   * @param id - Order.IdOrder
   * @returns OrderProduct[] - products
   */
  getByOrderId(id: number): Observable<OrderProduct[]> {
    const endpoint = `${environment.apiUrl}/products/order/${id}`;
    return this.http.get<OrderProduct[]>(endpoint);
  }


  /**
   * Creates order product
   * @param order - OrderProduct to create
   */
  create(order: CreateOrderProduct): Observable<unknown> {
    const endpoint = `${environment.apiUrl}/products`;
    return this.http.post<unknown>(endpoint, order);
  }


  /**
   * Updates order product
   * @param order - OrderProduct to update
   */
  update(order: UpdateOrderProduct): Observable<unknown> {
    const endpoint = `${environment.apiUrl}/products/${order.IdOrdersProducts}`;
    return this.http.put<unknown>(endpoint, order);
  }


  /**
   * Deletes order product
   * @param id - OrderProduct.IdOrdersProducts
   */
  delete(id: number): Observable<unknown> {
    const endpoint = `${environment.apiUrl}/products/${id}`;
    return this.http.delete<unknown>(endpoint);
  }
}
