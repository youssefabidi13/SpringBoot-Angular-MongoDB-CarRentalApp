import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from 'src/app/entities/car';
import { Client } from 'src/app/entities/client';
import { Order } from 'src/app/entities/order';
import { User } from 'src/app/entities/user';
import { AdminService } from 'src/app/services/admin.service';
import { CarServiceService } from 'src/app/services/car-service.service';
import { ClientService } from 'src/app/services/client.service';
import { OrderService } from 'src/app/services/order.service';
import {Chart,registerables } from 'node_modules/chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router,private orderService: OrderService,private clientService: ClientService,private carService:CarServiceService,private adminService: AdminService) { }
  startDate?:Date;
  endDate?:Date;
  orders?: Order[];
  totalRevenue?:number;
  clients!: Client[];
  nbClient: number=0;
  cars!:any;
  nbCars!: number;
  managers!: User[];
  nbManagers!: number;
  data: any;
  ordersInHold?: Order[];
  OrdersAccepted?: Order[];
  ordersRefused?: Order[];
  orderInHold?: number ;
  orderRe?: number ;
  orderAc?: number ;
  nbCar:any;
  
  //Slider settings
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1} ;
  ngOnInit(): void {
    this.getAllOrdersAccepted();
    this.getAllClient();
    this.loadCars();
    this.getAllUsers();
    this.renderChart1();
    //this.getNumberOfCars();
    
    this.carService.getData().subscribe({
      next: (data) => {
        this.data = data;
        console.log(this.data); // Log the updated value of this.data
        console.log(this.data.nbOrdersByMonth["01"]);
        console.log(this.data.nbOrdersByMonth["06"]);
        console.log(this.data.nbOrdersByMonth["07"]);
        this.renderChart();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  renderChart() {
    new Chart("myChart", {
      type: 'bar',
      data: {
        labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        datasets: [{
          label: 'Number of Orders',
          data: [
            this.data.nbOrdersByMonth["01"],
            this.data.nbOrdersByMonth["02"],
            this.data.nbOrdersByMonth["03"],
            this.data.nbOrdersByMonth["04"],
            this.data.nbOrdersByMonth["05"],
            this.data.nbOrdersByMonth["06"],
            this.data.nbOrdersByMonth["07"],
            this.data.nbOrdersByMonth["08"],
            this.data.nbOrdersByMonth["09"],
            this.data.nbOrdersByMonth["10"],
            this.data.nbOrdersByMonth["11"],
            this.data.nbOrdersByMonth["12"]
          ],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Orders'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Month'
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }
  onSubmit():void{
    console.log(this.startDate);
    console.log(this.endDate);
    this.router.navigate(['/carbydate', this.startDate, this.endDate]);
  }
  getAllOrdersAccepted(): void {
    this.orderService.getAllOrdersAccepted().subscribe((orders) => {
      this.orders = orders;
      this.totalRevenue = 0; // Initialize totalRevenue to 0
      for(let i = 0; i < this.orders.length; i++) {
        this.totalRevenue += this.orders[i].totalCost;
      }
    });
  }
  getAllClient(): void {
    this.clientService.getAllClient().subscribe((clients) => {
      this.clients = clients;
      this.nbClient! = this.clients.length;
    });
  }
  loadCars():void {
    this.carService.getAllCars()
      .subscribe(
        data => {
          this.cars! = data;
          this.nbCars! = this.cars.length;
        }
      );

  }
  getAllUsers(): void {
    this.adminService.getAllUsers().subscribe((users) => {
      this.managers = users;
      this.nbManagers = 0;
      for(let i = 0; i < this.managers.length; i++) {
        if(this.managers[i].role == "MANAGER") {
          this.nbManagers++;
        }
      }
    });
  }
  async renderChart1(): Promise<void> {
    await Promise.all([
      this.getAllOrdersInHold(),
      this.getAllOrdersAccepted1(),
      this.getAllOrdersRefused()
    ]);

    console.log(this.orderInHold);
    console.log(this.orderAc);
    console.log(this.orderRe);
    
    new Chart("myChart1", {
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
  // getNumberOfCars(): void {
  //   this.carService.getCountCars().subscribe((cars) => {
  //     this.nbCar = cars;
  //   });
  // }

   renderChart2(){

    new Chart("myChart2", {
      type: 'pie',
      data: {
        labels: [
          'AVAILABLE',
          'NOT AVAILABLE',
          
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [this.nbCar['available'], this.nbCar['unavailable']],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
          ],
          // hoverOffset: 4
        }]
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

  getAllOrdersAccepted1(): Promise<void> {
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