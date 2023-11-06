import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/entities/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders-refused',
  templateUrl: './orders-refused.component.html',
  styleUrls: ['./orders-refused.component.css']
})
export class OrdersRefusedComponent implements OnInit {

  constructor(private orderService: OrderService,
    private router: Router,
    private httpClient: HttpClient) { }
    orders?: Order[];

  ngOnInit(): void {
    this.getAllOrdersRefused();
  }
  getAllOrdersRefused(): void {
    this.orderService.getAllOrdersrefused().subscribe((orders) => {
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
