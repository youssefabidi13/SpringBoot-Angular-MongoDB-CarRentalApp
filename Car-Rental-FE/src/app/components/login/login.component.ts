import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/entities/user';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { getCookie } from 'typescript-cookie';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  authStatus: string = '';
  model = new User();

  constructor(private loginService: LoginServiceService, private router: Router) {}

  ngOnInit(): void {}

  findUserByEmail(email: string) {
    this.loginService.findUserByEmail(email).pipe().subscribe(
      (data) => {
        this.model = data;
      }
    );
  }

 
  validateUser(loginForm: NgForm) {
    this.loginService.validateLoginDetails(this.model).subscribe(
      (responseData) => {
        
        if (responseData.status === 200) {
          this.model!= responseData.body;
          //this.model.role = responseData.body["role"];
          console.log(responseData.body);
          console.log(this.model);
          window.sessionStorage.setItem(
            'Authorization',
            responseData.headers.get('Authorization')!
          );
          
          let xsrf = getCookie('XSRF-TOKEN')!;
          window.sessionStorage.setItem('XSRF-TOKEN', xsrf);
          this.model.authStatus = 'AUTH';
          //this.model.motDePasse = loginForm.value.password;
          window.sessionStorage.setItem(
            'userdetails',
            JSON.stringify(this.model)
          );
          // show success message with SweetAlert
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Login successful!',
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigate(['']);
        }
  
        // read jwt token from response header
        // window.sessionStorage.setItem(
        //   'Authorization',
        //   responseData.headers.get('Authorization')!
        // );
        
        // this.model = this.findUserByEmail(loginForm.value.email);
        
         
        // let xsrf = getCookie('XSRF-TOKEN')!;
        // window.sessionStorage.setItem('XSRF-TOKEN', xsrf);
        // //this.model.authStatus = 'AUTH';
        // this.model.motDePasse = loginForm.value.password;
        
        // this.loginService.getCustomerId(loginForm.value.email).subscribe(
        //   (data) => {
        //     this.model.id = data;
        //     console.log(data);
        //     window.sessionStorage.setItem(
        //       'userdetails',
        //       JSON.stringify(this.model)
        //     );
            
        //     //this.router.navigate(['/']);
        //   }
        // );
      },
      (error) => {
        console.log(error+"error");
        // show error message with SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Login failed!',
          text:'you have entered wrong email or password',
          showConfirmButton: true
        });
      }
    );
  }
  
  
}

