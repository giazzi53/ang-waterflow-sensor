import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ChartView } from '../interfaces/chartView';
import { ColumnChart } from '../chartViews/column-chart';
import { PieChart } from '../chartViews/pie-chart';
import { SplineChart } from '../chartViews/spline-chart';
import { LiveChart } from '../chartViews/live-chart';

@Injectable({
  providedIn: 'root'
})

export class HomeService {

  constructor(private http: HttpClient) { }

  getUserData(username: string) {
    const url = `${environment.personBaseUrl}/getUserData`;
    const httpOptions = {
      headers: new HttpHeaders({
        'username': username
      })
    };
    console.log("Requisição para recuperar dados do usuário: " + httpOptions.headers.get('username'));
    return this.http.get<any>(url, httpOptions);
  }

  getFixedChartViewCards() : Observable<any> {
    const url = `${environment.personBaseUrl}/getFixedChartViewCards`;
    console.log("Requisição para recuperar cards dos gráficos das visões recebida");
    return this.http.get<any>(url);
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

  getDeviceDetails(username: string) : Observable<any> {
    const url = `${environment.personBaseUrl}/getDeviceDetails`;
    const httpOptions = {
      headers: new HttpHeaders({
        'username': username
      })
    };
    console.log("Requisição para recuperar detalhes do dispositivo. Usuário: " + httpOptions.headers.get('username'));
    return this.http.get<any>(url, httpOptions);
  }

  getChartView(chartId: string, username: string, incomingSource: string, deviceId?: string){
    const url = `${environment.personBaseUrl}/getChartView`;
    const httpOptions = {
      headers: new HttpHeaders({
        'chartId': chartId,
        'deviceId': deviceId,
        'username': username,
        'incomingSource': incomingSource
      })
    };

    console.log("Requisição para recuperar gráfico. ChartId: " + httpOptions.headers.get('chartId') +
     ". DeviceId: " + httpOptions.headers.get('deviceId') + ". Usuário: " + httpOptions.headers.get('username') +
     ". IncomingSource: " + httpOptions.headers.get('incomingSource'));
    return this.http.get<any>(url, httpOptions);
  }

  openChart(chart: ChartView, selectedDevice?: string){
    let createdChart;
    if(chart.chartId == '1') {
      let pieChart = new PieChart();
      createdChart = pieChart.createPieChart(chart);
    } else if(chart.chartId == '2') {
      let splineChart = new SplineChart();
      createdChart = splineChart.createSplineChart(chart);
    } else if(chart.chartId == '3') {
      let columnChart = new ColumnChart();
      createdChart = columnChart.createColumnChart(chart);
    } else if(chart.chartId == '4') {
      let liveChart = new LiveChart();
      createdChart = liveChart.createLiveChart(chart, selectedDevice);
    }
    
    return createdChart;
  }

}
