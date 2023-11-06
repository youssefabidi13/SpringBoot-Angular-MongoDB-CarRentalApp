import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../entities/user';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }
  private adminUrl='http://localhost:8080/manager/findAllAdmins';
  getAllAdmin(): Observable<User[]> {
    const url = `${this.adminUrl}`;
    return this.httpClient.get<User[]>(url)
      .pipe(
        catchError((error) => {
          console.log(error);
          throw error;
        })
      );
  }

  private userUrl='http://localhost:8080/manager/findAllUsers';
  getAllUsers(): Observable<User[]> {
    const url = `${this.userUrl}`;
    return this.httpClient.get<User[]>(url)
      .pipe(
        catchError((error) => {
          console.log(error);
          throw error;
        })
      );
  }
  

  private deleteUrl='http://localhost:8080/manager/deleteUser';
  deleteUser(id: string): Observable<any> {
    const url = `${this.deleteUrl}/${id}`;
    return this.httpClient.delete(url, { responseType: 'text' });
  }

  private emailGetUrl='http://localhost:8080/manager/checkEmailExist';
  checkEmailExists(email: string): Observable<boolean> {
    const url = `${this.emailGetUrl}/${email}`;
    return this.httpClient.get<boolean>(url);
  }

  private updateUrl='http://localhost:8080/manager/updateUser';
  edit(user: User): Observable<User> {
    const url = `${this.updateUrl}/${user.id}`;
    return this.httpClient.patch<User>(url, user);
  }

  private addUrl='http://localhost:8080/manager/addUser';
  add(user: User): Observable<User> {
    const url = `${this.addUrl}`;
    return this.httpClient.post<User>(url, user);
  }

}
