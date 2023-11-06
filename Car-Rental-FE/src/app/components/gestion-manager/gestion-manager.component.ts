import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { User } from 'src/app/entities/user';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
function passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (password?.value !== confirmPassword?.value) {
    return { 'passwordMismatch': true };
  }
  return null;
}

@Component({
  selector: 'app-gestion-manager',
  templateUrl: './gestion-manager.component.html',
  styleUrls: ['./gestion-manager.component.css']
})
export class GestionManagerComponent implements OnInit {

  users?: User[];
  showEditForm: boolean = false;
  selectedId?: string;
  constructor(private fb: FormBuilder,private adminService: AdminService, private router: Router,private httpClient:HttpClient) {}
  editForm = this.fb.group({
    id: [''],
    email: ['', [Validators.required, Validators.email]],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    //cin
    address: ['', Validators.required],
    phone: ['', Validators.required],
    password: ['', Validators.required],
    role: ['', Validators.required],confirmPassword: ['', Validators.required]
  }, {
    validator: passwordMatchValidator
  });
  ngOnInit(): void {
    this.getAllUsers();
  }
  // //get request from web api
  // this.ClientService.getAllClient.subscribe(data => {
  //   this.data =data;
  getAllUsers(): void {
    this.adminService.getAllUsers().subscribe((users) => {
      this.users = users;
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
    this.adminService.deleteUser(id).subscribe((response) => {
      console.log(response);
      this.getAllUsers();
      window.location.reload();
    });
  }
  onSubmit() {
    console.log(this.editForm.value);
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }
  
    const email = this.editForm.value.email!;
    const address = this.editForm.value.address!;
  
    // Check if email or cin already exist
    this.adminService.checkEmailExists(email).subscribe((emailExists) => {
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
            let user = new User();
            user.email = email;
            user.firstName = this.editForm.value.firstname!;
            user.lastName = this.editForm.value.lastname!;
            user.phoneNumber = this.editForm.value.phone!;
            user.address = address;
            user.role = this.editForm.value.role!;
            user.motDePasse = this.editForm.value.password!;
  
            this.adminService.add(user).pipe(
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
                    title: 'User added successfully',
                    showConfirmButton: false,
                    timer: 1500
                  });
                  window.location.reload();
                }
                
                
                return throwError('Something went wrong. Please try again later.');
              })
            ).subscribe((response) => {
              if (response.address !== null && response.email !== null && response.firstName !== null && response.lastName !== null && response.phoneNumber !== null && response.id) {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'User added successfully',
                  showConfirmButton: false,
                  timer: 1500
                });
              }
              window.location.reload();
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
      get address() {
        return this.editForm.get('address');
      }
      get password() {
        return this.editForm.get('password');
      }
      get role() {
        return this.editForm.get('role');
      }
      
      get confirmPassword() {
        return this.editForm.get('confirmPassword');
      }
      
      toggleEditForm() {
        this.showEditForm = true;
      }
      
    }
  
  
  

 


