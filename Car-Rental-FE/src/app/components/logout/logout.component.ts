import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/entities/user';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  user = new User();
  constructor(private router : Router) { 

  }

  ngOnInit(): void {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Logout successful!',
      showConfirmButton: false,
      timer: 1500
    }).then(() =>{
      window.sessionStorage.setItem("userdetails","");
      window.sessionStorage.setItem("XSRF-TOKEN","");
      this.router.navigate(['/login']);
    })
    // window.sessionStorage.setItem("userdetails","");
    // window.sessionStorage.setItem("XSRF-TOKEN","");
    // this.router.navigate(['/login']);
  }

}
