import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Person } from '../interfaces/person';
import { Observable,throwError  } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, retry } from 'rxjs/operators';
import { Chart } from '../interfaces/chart';
import { ChartType } from '../enum/chart-type';
import { ColumnChart } from '../view/charts/column-chart';

@Injectable({
    providedIn: 'root'
  })
export class ViewService {

    chart: Chart;

    constructor() {
        //this.createChart(chart);
     }
  
           
}