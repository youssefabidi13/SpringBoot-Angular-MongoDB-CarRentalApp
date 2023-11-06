import { Injectable } from '@angular/core';
import { Order } from '../entities/order';
import { Observable, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }
  private orderUrl='http://localhost:8080/order/findAllOrdersInHold';
  getAllOrdersInHold(): Observable<Order[]> {
    const url = `${this.orderUrl}`;
    return this.httpClient.get<Order[]>(url)
      .pipe(
        catchError((error) => {
          console.log(error);
          throw error;
        })
      );
  }
  private actionOrder='http://localhost:8080/order/updateState';
  acceptOrder(order: Order): Observable<Order> {
    const url = `${this.actionOrder}/${order.id}`;
    return this.httpClient.patch<Order>(url, order);
  }
  
  private orderAcceptedUrl='http://localhost:8080/order/findAllOrdersAccepted';
  getAllOrdersAccepted(): Observable<Order[]> {
    const url = `${this.orderAcceptedUrl}`;
    return this.httpClient.get<Order[]>(url)
      .pipe(
        catchError((error) => {
          console.log(error);
          throw error;
        })
      );
  }
  private orderRefusedUrl='http://localhost:8080/order/findAllOrdersRefused';
  getAllOrdersrefused(): Observable<Order[]> {
    const url = `${this.orderRefusedUrl}`;
    return this.httpClient.get<Order[]>(url)
      .pipe(
        catchError((error) => {
          console.log(error);
          throw error;
        })
      );
  }
}
