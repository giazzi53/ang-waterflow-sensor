import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Person } from '../interfaces/person';

@Injectable({
  providedIn: 'root'
})

export class ViewCardService {

  constructor(private http: HttpClient) { }

  getCards(username: string) : Observable<any> {
    const url = `${environment.personBaseUrl}/getCards`;

    // let headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');

    const httpOptions = {
      headers: new HttpHeaders({
        'username': username
      })
    };
    console.log("Requisição para recuperar cards das visões: " + httpOptions.headers.get('username'));
    return this.http.get<any>(url, httpOptions);
  }
}
