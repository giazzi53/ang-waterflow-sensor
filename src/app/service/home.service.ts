import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Person } from '../interfaces/person';

@Injectable({
  providedIn: 'root'
})

export class HomeService {

  constructor(private http: HttpClient) { }

  getCards(username: string) : Observable<any> {
    const url = `${environment.personBaseUrl}/getCards`;
    const httpOptions = {
      headers: new HttpHeaders({
        'username': username
      })
    };
    console.log("Requisição para recuperar cards das visões: " + httpOptions.headers.get('username'));
    return this.http.get<any>(url, httpOptions);
  }

  getDevices(username: string) : Observable<any> {
    const url = `${environment.personBaseUrl}/getDevices`;
    const httpOptions = {
      headers: new HttpHeaders({
        'username': username
      })
    };
    console.log("Requisição para recuperar dispositivos: " + httpOptions.headers.get('username'));
    return this.http.get<any>(url, httpOptions);
  }
}
