import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { User } from 'src/app/entities/user';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user = new User();
  userTemp = new User();

  constructor(private loginService: LoginServiceService) {
  }

  ngOnInit() {
    if(sessionStorage.getItem('userdetails')){

      this.user = JSON.parse(sessionStorage.getItem('userdetails')!);
      this.loginService.findUserByEmail(this.user.email).subscribe(
        (data: User) => {
          this.userTemp = data;
        }
      );

    }
    
  }
  
}
