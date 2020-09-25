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

    private baseUserRoute: string = 'v1/users';

    public getUserData(username: string) {
      const url = `${environment.personBaseUrl}/${this.baseUserRoute}/profile-data`;
      const httpOptions = {
        headers: new HttpHeaders({
          'username': username
        })
      };
  
      console.log("Requisição para recuperar dados do usuário: " + httpOptions.headers.get('username'));
      return this.http.get<any>(url, httpOptions);
    }

    public update(person: Person, currentUsername: string): Observable<Person> {
      const url = `${environment.personBaseUrl}/${this.baseUserRoute}/profile/${currentUsername}`;
      console.log('Requisição para atualizar dados do perfil do usuário ' + currentUsername + ': ' + JSON.stringify(person));
      return this.http.put<Person>(url, person);
    }
}