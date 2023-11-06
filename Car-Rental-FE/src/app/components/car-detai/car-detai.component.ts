import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Order, Statu } from 'src/app/entities/order';
import { CarServiceService } from 'src/app/services/car-service.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-car-detai',
  templateUrl: './car-detai.component.html',
  styleUrls: ['./car-detai.component.css']
})
export class CarDetaiComponent implements OnInit {

  id:string ='';
  car ?: any;
  cin: any;
  client : any;
  Ddebut?:any;
  Dfin?:any;
  order? : Order;
  constructor(private carService:CarServiceService,private route:ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.id=params['id'];
      this.Ddebut=params['Ddebut'];
      this.Dfin=params['Dfin'];
    });
    this.carService.getCarById(this.id).subscribe({
      next : (data)=>{
        this.car=data;
      },
      error : (err)=>{}
    });
  }
  searchClient(): void {
    this.carService.getClientByCIN(this.cin).subscribe({
      next: (data) => {
        this.client = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  calculateCost():number{
    let date1 = new Date(this.Ddebut);
    let date2 = new Date(this.Dfin);
    let diff = Math.abs(date1.getTime() - date2.getTime());
    let diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    return diffDays*this.car.pricePerDay;
  }

  makeOrder():void{
    this.order={
      id:'',
      client:this.client,
      car:this.car,
      startDate:this.Ddebut,
      endDate:this.Dfin,
      state:Statu.InHold,
      totalCost:this.calculateCost()
    }
    this.carService.addOrder(this.order).subscribe({
      next: (response) => {
        console.log(response);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your order has been saved',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['']);
      },
      error : (error) => {
        console.error(error);
        if(error.status==200){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your order has been saved',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['']);
        }else{
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Your order has not been saved',
            showConfirmButton: false,
            timer: 1500
          })
        }

      }
    }
    );
  }

}
