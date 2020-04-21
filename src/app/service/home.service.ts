import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ChartView } from '../interfaces/chartView';
import { ColumnChart } from '../chartViews/column-chart';
import { PieChart } from '../chartViews/pie-chart';
import { SplineChart } from '../chartViews/spline-chart';
import { LineChart } from '../chartViews/line-chart';

@Injectable({
  providedIn: 'root'
})

export class HomeService {

  constructor(private http: HttpClient) { }

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

  getDeviceDetails(username: string, deviceDescription: string) : Observable<any> {
    const url = `${environment.personBaseUrl}/getDeviceDetails`;
    const httpOptions = {
      headers: new HttpHeaders({
        'username': username,
        'description': deviceDescription
      })
    };
    console.log("Requisição para recuperar detalhes do dispositivo. Usuário: " + httpOptions.headers.get('username') +  ". Description:" + httpOptions.headers.get('description'));
    return this.http.get<any>(url, httpOptions);
  }

  getChartView(id: string, username: string){
    const url = `${environment.personBaseUrl}/getChartView`;
    const httpOptions = {
      headers: new HttpHeaders({
        'chartId': id,
        'username': username
      })
    };
    console.log("Requisição para recuperar gráfico. Id: " + httpOptions.headers.get('chartId'), ". Usuário: " + httpOptions.headers.get('username'));
    return this.http.get<any>(url, httpOptions);
  }

  openChart(chart: ChartView){
    let createdChart;
    if(chart.type == 'column') {
        let columnChart = new ColumnChart();
        createdChart = columnChart.createColumnChart(chart);
    } else if(chart.type == 'line') {
      let lineChart = new LineChart();
      createdChart = lineChart.createLineChart(chart);
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
