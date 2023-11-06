import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../entities/client';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private httpClient: HttpClient) { }
  private baseUrl='http://localhost:8080/client/findAllClients';
  
  getAllClient(): Observable<Client[]> {
    const url = `${this.baseUrl}`;
    return this.httpClient.get<Client[]>(url)
      .pipe(
        catchError((error) => {
          console.log(error);
          throw error;
        })
      );
  }
  private deleteUrl='http://localhost:8080/client/deleteClient';

  deleteClient(id: string): Observable<any> {
    const url = `${this.deleteUrl}/${id}`;
    return this.httpClient.delete(url, { responseType: 'text' });
  }

  private updateUrl='http://localhost:8080/client/updateClient';
  edit(client: Client): Observable<Client> {
    const url = `${this.updateUrl}/${client.id}`;
    return this.httpClient.patch<Client>(url, client);
  }

  private addUrl='http://localhost:8080/client/addClient';
  add(client: Client): Observable<Client> {
    const url = `${this.addUrl}`;
    return this.httpClient.post<Client>(url, client);
  }

  private emailGetUrl='http://localhost:8080/client/checkEmailExist';
  checkEmailExists(email: string): Observable<boolean> {
    const url = `${this.emailGetUrl}/${email}`;
    return this.httpClient.get<boolean>(url);
  }

  private cinGetUrl='http://localhost:8080/client/checkCinExist';
  checkCinExists(cin: string): Observable<boolean> {
    const url = `${this.cinGetUrl}/${cin}`;
    return this.httpClient.get<boolean>(url);
  }

  private clientGetUrl='http://localhost:8080/client/findClientById';
  getOneClient(id: string): Observable<Client> {
    const url = `${this.clientGetUrl}/${id}`;
    return this.httpClient.get<Client>(url);
  }

  
}
