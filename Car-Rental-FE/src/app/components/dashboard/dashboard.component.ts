import { OrdersAcceptedComponent } from './../orders-accepted/orders-accepted.component';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart,registerables } from 'node_modules/chart.js';
import { Order } from 'src/app/entities/order';
import { OrderService } from 'src/app/services/order.service';
Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private orderService: OrderService) { }
  
  ordersInHold?: Order[];
  OrdersAccepted?: Order[];
  ordersRefused?: Order[];
  orderInHold?: number ;
  orderRe?: number ;
  orderAc?: number ;

  ngOnInit(): void {
    this.renderChart();
  }

  async renderChart(): Promise<void> {
    await Promise.all([
      this.getAllOrdersInHold(),
      this.getAllOrdersAccepted(),
      this.getAllOrdersRefused()
    ]);

    console.log(this.orderInHold);
    console.log(this.orderAc);
    console.log(this.orderRe);
    
    new Chart("myChart", {
      type: 'bar',
      data: {
        labels: ['IN HOLD', 'ACCEPTED', 'REFUSED'],
        datasets: [{
          label: 'Number of Orders',
          data: [this.orderInHold, this.orderAc, this.orderRe],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            display: true,
          }
        }
      }
    });
  }

  getAllOrdersRefused(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.orderService.getAllOrdersrefused().subscribe((orders) => {
        this.ordersRefused = orders;
        this.orderRe = this.ordersRefused.length;
        resolve();
      });
    });
  }

  getAllOrdersAccepted(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.orderService.getAllOrdersAccepted().subscribe((orders) => {
        this.OrdersAccepted = orders;
        this.orderAc = this.OrdersAccepted.length;
        resolve();
      });
    });
  }

  getAllOrdersInHold(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.orderService.getAllOrdersInHold().subscribe((orders) => {
        this.ordersInHold = orders;
        this.orderInHold = this.ordersInHold.length;
        resolve();
      });
    });
  }
}
