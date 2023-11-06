import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/entities/client';
import { ClientService } from 'src/app/services/client.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.css']
})
export class FormEditComponent implements OnInit {

  constructor(private fb: FormBuilder,private clientService: ClientService, private router: Router,private httpClient:HttpClient,private route: ActivatedRoute) {}
  editForm = this.fb.group({
    id: [''],
    email: ['',  Validators.email],
    firstname: [''],
    lastname: [''],
    cin: [''],
    phone: [''],
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
    
    let client = new Client();
    
     this.route.params.subscribe(params => {
      client.id = params['id'];
      console.log(client.id);
    }); 
    client.email = this.editForm.value.email !;
    client.firstName = this.editForm.value.firstname!;
    client.lastName = this.editForm.value.lastname!;
    client.phoneNumber = this.editForm.value.phone!;
    client.cin = this.editForm.value.cin!;
    this.clientService.edit(client).subscribe((response) => {
      console.log(response);
      if(response.id!=null){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Client updated successfully',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/gestion-client']);
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
  get cin() {
    return this.editForm.get('cin');
  }
}
