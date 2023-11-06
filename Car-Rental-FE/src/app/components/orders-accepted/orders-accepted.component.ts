import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/entities/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders-accepted',
  templateUrl: './orders-accepted.component.html',
  styleUrls: ['./orders-accepted.component.css']
})
export class OrdersAcceptedComponent implements OnInit {

  constructor( private orderService: OrderService,
    private router: Router,
    private httpClient: HttpClient) { }
    orders?: Order[];

  ngOnInit(): void {
    this.getAllOrdersAccepted();
  }
  getAllOrdersAccepted(): void {
    this.orderService.getAllOrdersAccepted().subscribe((orders) => {
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
}
