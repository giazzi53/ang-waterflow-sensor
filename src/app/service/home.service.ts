import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Person } from '../interfaces/person';
import { Chart } from '../interfaces/chart';
import { ColumnChart } from '../view/charts/column-chart';
import { PieChart } from '../view/charts/pie-chart';
import { SplineChart } from '../view/charts/spline-chart';

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

  createChart(chart: Chart){
    let createdChart;
    if(chart.type == 'column') {
        let columnChart = new ColumnChart();
        createdChart = columnChart.createColumnChart(chart);
    } else if(chart.type == 'pie') {
        let pieChart = new PieChart();
        createdChart = pieChart.createPieChart(chart);
    } else if(chart.type == 'spline') {
      let splineChart = new SplineChart();
      createdChart = splineChart.createSplineChart(chart);
    }
    return createdChart;
  }

}
