import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ChartView } from '../interfaces/chartView';
import { ColumnChart } from '../chartViews/column-chart';
import { PieChart } from '../chartViews/pie-chart';
import { SplineChart } from '../chartViews/spline-chart';

@Injectable({
  providedIn: 'root'
})

export class HomeService {

  constructor(private http: HttpClient) { }

  getChartViewCards(username: string) : Observable<any> {
    const url = `${environment.personBaseUrl}/getChartViewCards`;
    const httpOptions = {
      headers: new HttpHeaders({
        'username': username
      })
    };
    console.log("Requisição para recuperar cards dos gráficos das visões recebida. Usuário: " + httpOptions.headers.get('username'));
    return this.http.get<any>(url, httpOptions);
  }

  getDeviceCards(username: string) : Observable<any> {
    const url = `${environment.personBaseUrl}/getDeviceCards`;
    const httpOptions = {
      headers: new HttpHeaders({
        'username': username
      })
    };
    console.log("Requisição para recuperar cards dos dispositivos recebida. Usuário: " + httpOptions.headers.get('username'));
    return this.http.get<any>(url, httpOptions);
  }

  getDeviceDetails(deviceId: string) : Observable<any> {
    const url = `${environment.personBaseUrl}/getDeviceDetails`;
    const httpOptions = {
      headers: new HttpHeaders({
        'deviceId': deviceId,
      })
    };
    console.log("Requisição para recuperar detalhes do dispositivo. DeviceId:" + httpOptions.headers.get('deviceId'));
    return this.http.get<any>(url, httpOptions);
  }

  createChart(chart: ChartView){
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
