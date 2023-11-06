import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/entities/client';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-gestion-client',
  templateUrl: './gestion-client.component.html',
  styleUrls: ['./gestion-client.component.css'],
})

export class GestionClientComponent implements OnInit {
  clients?: Client[];
  showEditForm: boolean = false;
  selectedId?: string;
  constructor(private fb: FormBuilder,private clientService: ClientService, private router: Router,private httpClient:HttpClient) {}
  editForm = this.fb.group({
    id: [''],
    email: ['', [Validators.required, Validators.email]],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    cin: ['', Validators.required],
    phone: ['', Validators.required],
    
  });
  ngOnInit(): void {
    this.getAllClient();
  }
  // //get request from web api
  // this.ClientService.getAllClient.subscribe(data => {
  //   this.data =data;
  getAllClient(): void {
    this.clientService.getAllClient().subscribe((clients) => {
      this.clients = clients;
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
  onDelete(id: string) {
    this.clientService.deleteClient(id).subscribe((response) => {
      console.log(response);
      this.getAllClient();
      window.location.reload();
    });
  }
  onEdit(id: string) {
    this.clientService.deleteClient(id).subscribe((response) => {
      console.log(response);
      this.getAllClient();
      window.location.reload();
    });
  }
  // onSubmit() {
  //   console.log(this.editForm.value);
  //   if (this.editForm.invalid) {
  //     this.editForm.markAllAsTouched();
  //     return;
  //   }
  //   const email = this.editForm.value.email!;
  //   const cin = this.editForm.value.cin!;
  
  //   // Check if email or cin already exist
  //   this.clientService.checkEmailExists(email).subscribe((emailExists) => {
  //     if (emailExists) {
  //       Swal.fire({
  //         position: 'center',
  //         icon: 'error',
  //         title: 'Email already exists',
  //         showConfirmButton: false,
  //         timer: 1500
  //       })
  //       window.location.reload();
  //     }
  //   });
  //   this.clientService.checkCinExists(cin).subscribe((cinExists) => {
  //     if (cinExists) {
  //       Swal.fire({
  //         position: 'center',
  //         icon: 'error',
  //         title: 'CIN already exists',
  //         showConfirmButton: false,
  //         timer: 1500
  //       })
  //       window.location.reload();
  //     }}
  //   );
  //   let client = new Client();
  //   client.email = this.editForm.value.email!;
  //   client.firstName = this.editForm.value.firstname!;
  //   client.lastName = this.editForm.value.lastname!;
  //   client.phoneNumber = this.editForm.value.phone!;
  //   client.cin = this.editForm.value.cin!;
  //   this.clientService.add(client).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       console.error('HTTP Error:', error.status, error.statusText);
  //       if (error.status === 200) {
  //         Swal.fire({
  //           position: 'center',
  //           icon: 'success',
  //           title: 'Client added successfully',
  //           showConfirmButton: false,
  //           timer: 1500
  //         })
  //         window.location.reload();
  //         console.error('An error occurred:', error.error);
  //       }
  //       return throwError('Something went wrong. Please try again later.');
  //     })
  //   )
  //   .subscribe((response) => {

  //     if(response.cin !==null && response.email !==null && response.firstName !==null && response.lastName !==null && response.phoneNumber !==null && response.id !){
  //       Swal.fire({
  //         position: 'center',
  //         icon: 'success',
  //         title: 'Client added successfully',
  //         showConfirmButton: false,
  //         timer: 1500
  //       })
  //     }
  //   });
    
    

  // }
  onSubmit() {
    console.log(this.editForm.value);
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }
  
    const email = this.editForm.value.email!;
    const cin = this.editForm.value.cin!;
  
    // Check if email or cin already exist
    this.clientService.checkEmailExists(email).subscribe((emailExists) => {
      if (emailExists) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Email already exists',
          showConfirmButton: false,
          timer: 1500
        });
        window.location.reload();
      } else {
        this.clientService.checkCinExists(cin).subscribe((cinExists) => {
          if (cinExists) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'CIN already exists',
              showConfirmButton: false,
              timer: 1500
            });
            window.location.reload();
          } else {
            let client = new Client();
            client.email = email;
            client.firstName = this.editForm.value.firstname!;
            client.lastName = this.editForm.value.lastname!;
            client.phoneNumber = this.editForm.value.phone!;
            client.cin = cin;
  
            this.clientService.add(client).pipe(
              catchError((error: HttpErrorResponse) => {
                console.error('HTTP Error:', error.status, error.statusText);
                // Handle error response if necessary
                if (error.status === 500) {
                  Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Internal server error',
                    showConfirmButton: false,
                    timer: 1500
                  });
                  window.location.reload();
                }
                if(error.status === 404){
                  Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Not found',
                    showConfirmButton: false,
                    timer: 1500
                  });
                  window.location.reload();
                }
                if(error.status === 200){
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Client added successfully',
                    showConfirmButton: false,
                    timer: 1500
                  });
                  window.location.reload();
                }
                
                
                return throwError('Something went wrong. Please try again later.');
              })
            ).subscribe((response) => {
              if (response.cin !== null && response.email !== null && response.firstName !== null && response.lastName !== null && response.phoneNumber !== null && response.id) {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Client added successfully',
                  showConfirmButton: false,
                  timer: 1500
                });
              }
              window.location.reload();
            });
          }
        });
      }
    });
  }
  
  

  get email() {
    return this.editForm.get('email');
  }
  get firstname() {
    return this.editForm.get('firstname');
  }
  get lastname() {
    return this.editForm.get('lastname');
  }
  get phone() {
    return this.editForm.get('phone');
  }
  get cin() {
    return this.editForm.get('cin');
  }
  toggleEditForm() {
    this.showEditForm = true;
  }
  
}
