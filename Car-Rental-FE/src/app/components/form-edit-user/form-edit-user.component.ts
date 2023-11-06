import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-form-edit-user',
  templateUrl: './form-edit-user.component.html',
  styleUrls: ['./form-edit-user.component.css']
})
export class FormEditUserComponent implements OnInit {

  constructor(private fb: FormBuilder,private adminService: AdminService, private router: Router,private httpClient:HttpClient,private route: ActivatedRoute) { }
  editForm = this.fb.group({
    id: [''],
    email: ['',  Validators.email],
    firstname: [''],
    lastname: [''],
    address: [''],
    phone: [''],
    password: [''],
    role: [''],
    confirmPassword: ['']
  }, {
    validator: passwordMatchValidator
  });
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      // Use the extracted ID as needed
      console.log(id);
    }); 
  }
  onSubmit() {
    console.log(this.editForm.value);
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }
    
    let user = new User();
    
     this.route.params.subscribe(params => {
      user.id = params['id'];
      console.log(user.id);
    }); 
    user.email = this.editForm.value.email !;
    user.firstName = this.editForm.value.firstname!;
    user.lastName = this.editForm.value.lastname!;
    user.phoneNumber = this.editForm.value.phone!;
    user.address = this.editForm.value.address!;
    user.motDePasse = this.editForm.value.password!;
    user.role = this.editForm.value.role!;

    this.adminService.edit(user).subscribe((response) => {
      console.log(response);
      if(response.id!=null){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'user updated successfully',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/gestion-manager']);
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      }
    });
    

  }
  
  get id() {
    return this.editForm.get('id');
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
  get confirmPassword() {
    return this.editForm.get('confirmPassword');
  }

  get role() {
    return this.editForm.get('role');
  }
  
}
