import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './entities/user';

@Injectable({
  providedIn: 'root'
})
export class RouterguardGuard implements CanActivate {
  user = new User();
    
    constructor(private router: Router){

    }

    canActivate(): boolean {
        let user = JSON.parse(sessionStorage.getItem('userdetails') || '{}');
        if (!user || !user.email) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
    

  
}
