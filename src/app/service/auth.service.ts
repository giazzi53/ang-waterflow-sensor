import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Person } from '../interfaces/person';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  private baseRoute: string = '/v1/auth';

  public login(username: string, password: string) : Observable<any> {
    const url = `${environment.personBaseUrl}/${this.baseRoute}/login`;

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'username': username,
        'password': password
      })
    };
    console.log("Requisição para login recebida. Usuário: " + httpOptions.headers.get('username'), "Senha: "+ httpOptions.headers.get('password'));
    return this.http.get<Person>(url, httpOptions);
  }

  public register(person: Person): Observable<Person> {
    const url = `${environment.personBaseUrl}/${this.baseRoute}/register`;
    console.log('Requisição para cadastro: ' + JSON.stringify(person));
    return this.http.post<Person>(url, person);
  }
}
