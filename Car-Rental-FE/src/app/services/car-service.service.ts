import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../entities/car';
import { Order } from '../entities/order';

@Injectable({
  providedIn: 'root'
})
export class CarServiceService {
  constructor(private http: HttpClient) { }
  getClientByCIN(cin: String) {
    return this.http.get(`http://localhost:8080/client/findClientByCin/${cin}`);
  }
  addOrder(order: Order): Observable<any> {
    console.log(order);
    order.id=null;
    return this.http.post("http://localhost:8080/order/addOrder", order);
  }
  
  getCarsByDates(Ddebut: Date | undefined, Dfin: Date | undefined): Observable<any> {
    return this.http.get(`http://localhost:8080/car/findByDates/${Ddebut}/${Dfin}`);
  }
  getCarById(id: string) : Observable<any> {
    return this.http.get(`http://localhost:8080/car/${id}`);
  }
  
  updateCar(id:String,car: Car): Observable<any> {
    return this.http.patch("http://localhost:8080/car/updateCar/"+id,car);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`http://localhost:8080/car/cars/${id}`);
  }
  getAllCars() {
    return this.http.get("http://localhost:8080/car/findAllCars");
  }
  addCar(car: Car): Observable<any> {
    console.log(car);
    car.id=null;
    return this.http.post("http://localhost:8080/car/addCar", car);
  }
  editCar(car: Car, id: any) : Observable<any> {
    car.id=id;
    return this.http.post("http://localhost:8080/car/updateCar/"+id, car);
  }    
  getData(): Observable<any> {
    return this.http.get(`http://localhost:8080/manager/statistics`);
  }
  getCountCars(): Observable<any> {
    return this.http.get(`http://localhost:8080/car/available`);
  }
}