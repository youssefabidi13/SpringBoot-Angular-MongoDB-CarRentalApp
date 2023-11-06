import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarServiceService } from 'src/app/services/car-service.service';

@Component({
  selector: 'app-car-by-date',
  templateUrl: './car-by-date.component.html',
  styleUrls: ['./car-by-date.component.css'],
})
export class CarByDateComponent implements OnInit {
  cars: any;
  Ddebut?: Date;
  Dfin?: Date;
  constructor(
    private carService: CarServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //this.Ddebut=param['Ddebut'];
    
    this.route.params.subscribe((params) => {
      this.Ddebut = params['Ddebut'];
      this.Dfin = params['Dfin'];
    });
    this.loadCars();
  }

  loadCars() {
    this.carService.getCarsByDates(this.Ddebut, this.Dfin).subscribe({
      next: (data) => {
        this.cars = data;
      },
      error: (err) => {},
    });
    
  }
}
