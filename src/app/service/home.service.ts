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

  getChart(chartId: string, username: string) : Observable<any> {
    const url = `${environment.personBaseUrl}/getChart`;
    const httpOptions = {
      headers: new HttpHeaders({
        'chartId': chartId,
        'username': username
      })
    };
    console.log("Requisição para recuperar dados do gráfico: " + httpOptions.headers.get('chartId') + httpOptions.headers.get('username'));
    return this.http.get<any>(url, httpOptions);
  }

  openDevice(deviceId: string) : Observable<any> {
    const url = `${environment.personBaseUrl}/getDeviceDetails`;
    const httpOptions = {
      headers: new HttpHeaders({
        'deviceId': deviceId,
      })
    };
    console.log("Requisição para abrir dispositivo: " + httpOptions.headers.get('deviceId'));
    return this.http.get<any>(url, httpOptions);
  }
}
