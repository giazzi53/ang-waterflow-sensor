import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../interfaces/person';
import { Observable  } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class RegisterService {
  
    constructor(private http: HttpClient) { }
  
    register(person: Person): Observable<Person> {
      const url = `${environment.personBaseUrl}/register`;
      console.log('Requisição para cadastro: ' + JSON.stringify(person));
      return this.http.post<Person>(url, person);
    }
}