import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Order, Statu } from 'src/app/entities/order';
import { OrderService } from 'src/app/services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private router: Router,
    private httpClient: HttpClient
  ) {}
  orders?: Order[];

  ngOnInit(): void {
    this.getAllOrdersInHold();
  }
  getAllOrdersInHold(): void {
    this.orderService.getAllOrdersInHold().subscribe((orders) => {
      this.orders = orders;
      setTimeout(() => {
        $('#datatableexample').DataTable({
          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true,
          lengthMenu: [5, 10, 25],
        });
      }, 1);
      // }, error => console.error(error));
    });
  }
  acceptOrder(order: Order) {
    order.state = Statu.Accepte;
    this.orderService
      .acceptOrder(order)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('HTTP Error:', error.status, error.statusText);
          if (error.status == 200) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Order accepted successfully',
              showConfirmButton: false,
              timer: 1500,
            });
            this.getAllOrdersInHold();
            window.location.reload();
          }
          return throwError(error.message);
        })
      )
      .subscribe((response) => {
        console.log(response);
        this.getAllOrdersInHold();
        window.location.reload();
      });
  }
  refuseOrder(order: Order) {
    order.state = Statu.Refuse;
    this.orderService.acceptOrder(order).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP Error:', error.status, error.statusText);
        if (error.status == 200) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Order refused successfully',
            showConfirmButton: false,
            timer: 1500,
          });
          this.getAllOrdersInHold();
          //window.location.reload();
        }
        return throwError(error.message);
      })
    ).subscribe((response) => {
      console.log(response);
      this.getAllOrdersInHold();
      //window.location.reload();
    }
    );
  }
}
