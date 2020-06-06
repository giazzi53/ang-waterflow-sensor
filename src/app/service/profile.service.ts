import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Person } from '../interfaces/person';
import { Observable  } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class ProfileService {
  
    constructor(private http: HttpClient) { }

    retrieveProfileData(username: string): Observable<Person> {
      const url = `${environment.personBaseUrl}/retrieveProfileData`;
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'username': username
        })
      };
      console.log('Requisição para recuperar dados completos do perfil: ' + httpOptions.headers.get('username'));
      return this.http.get<Person>(url, httpOptions);
    }

    update(person: Person, currentUsername: string): Observable<Person> {
      const url = `${environment.personBaseUrl}/updateProfile/`;
      console.log('Requisição para atualizar dados do perfil do usuário ' + currentUsername + ': ' + JSON.stringify(person));
      return this.http.put<Person>(url+currentUsername, person);
    }
}