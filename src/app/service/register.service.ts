import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Person } from '../interfaces/person';
import { Observable,throwError  } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
export class RegisterService {
  
    constructor(private http: HttpClient) { }
  
    register(person: Person): Observable<Person> {
      const url = `${environment.personBaseUrl}/register`;
      console.log('Requisição para cadastro: ' + JSON.stringify(person));
      return this.http.post<Person>(url,person);
    }
}