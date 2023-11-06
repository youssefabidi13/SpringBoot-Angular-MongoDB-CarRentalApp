import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../entities/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }
  validateLoginDetails(user: User) {
    window.sessionStorage.setItem("userdetails",JSON.stringify(user));
    return this.http.get('http://localhost:8080/manager/user', { observe: 'response',withCredentials: true });
  }

  getCustomerId(email: string):Observable<string> {
    return this.http.get<string>(`http://localhost:8080/manager/findUserIdByEmail/${email}`);
  }

  findUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`http://localhost:8080/manager/findUserByEmail/${email}`);
  }

}
