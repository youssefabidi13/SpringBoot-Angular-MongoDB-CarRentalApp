import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from 'src/app/entities/car';
import { CarServiceService } from 'src/app/services/car-service.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  cars :any;
  carId?: string ;
  car: Car = {
    id:'',
    model: '',
    brand: '',
    description: '',
    pricePerDay: 0,
    available: false,
    image:'',
    start_Date: new Date(),
    end_Date: new Date()
  };
  // selectedCar: Car = {
  //   id: '',
  //   model: '',
  //   brand: '',
  //   description: '',
  //   pricePerDay: 0,
  //   available: false,
  //   start_Date: new Date(),
  //   end_Date: new Date()
  // }; // Define the selectedCar variable with an empty object

  editCar(car: Car) {
    this.car = { ...car }; // Set the selectedCar variable to the chosen car object
    this.carId=car.id
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file:string = event.target.files[0].name;
      this.car.image = file ; // Assign the file to the 'image' property of the car object
      console.log(file);
    }
  }
  
  submitted = false;
  constructor(private http:HttpClient, private router: Router, private carService :CarServiceService) { }

  ngOnInit(): void {
    this.loadCars();
  }

  deleteCar(id:String):void{
    this.carService.delete(id).subscribe({
      next: (res) => {
        console.log(id);
        console.log(res);
        //this.router.navigate(['/car/findAllCars']);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Car deleted!',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.reload();
        }
        );
      },
      error: (e) => {
        if(e.status == 200){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Car deleted!',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            window.location.reload();
          }
          );
        }
        console.error(e);
        console.log(id);
      }
    });
  }

  savedCar(): void {
    console.log(this.car);
    this.carService.addCar(this.car).subscribe({
      next: (response) => {
        console.log(response);
        this.submitted = true;
        this.car = {
          id:'',
          model: '',
          brand: '',
          description: '',
          pricePerDay: 0,
          available: false,
          image:'',
          start_Date: new Date(),
          end_Date: new Date()
        };
        this.loadCars(); // Refresh the car list
        this.closeModal(); // Close the modal after submission
      },
      error : (error) => {
        console.error(error);
        if(error.status == 200){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Car added!',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            window.location.reload();
          }
          );
        }
      }

    }
    );
  }
  closeModal() {
    // Reset the form and close the modal
    this.submitted = false;
    this.car = {
      id:'',
      model: '',
      brand: '',
      description: '',
      pricePerDay: 0,
      available: false,
      image:'',
      start_Date: new Date(),
      end_Date: new Date()
    };
    const modal = document.getElementById('addModal');
    if (modal) {
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
    }
  }
  loadCars() {
    this.carService.getAllCars()
      .subscribe({
        next : (data)=>{
          this.cars=data;
        },
        error : (err)=>{}
      });
  }
  
  
  updateCar(): void {
    console.log(this.car);
    if (!this.carId) {
      console.error('Car ID is undefined.');
      return;
    }
    this.carService.updateCar(this.carId, this.car).subscribe({
      next: () => {
        // Success
        // Reset the car object and close the modal
        this.car = {
          id: '',
          model: '',
          brand: '',
          description: '',
          pricePerDay: 0,
          available: false,
          image:'',
          start_Date: new Date(),
          end_Date: new Date()
        };
        const editModal = document.getElementById('editModal');
        if (editModal) {
          editModal.classList.remove('show');
          editModal.setAttribute('aria-hidden', 'true');
        }
      },
      error: (error: any) => {
        // Error handling
        console.error('Failed to update car:', error);
        if(error.status == 200){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Car updated!',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            window.location.reload();
          }
          );
        }
      }
    });
  }
}