import { Component, OnInit, Input } from '@angular/core';
import { HomeService } from '../service/home.service';
import { ChartView } from '../interfaces/chartView';
import { Device } from '../interfaces/device';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loading = false;
  chartOpen = false;
  chartViewCards: ChartView[];
  deviceCards: Device[];
  chartView: ChartView;
  selectedDevice: Device;

  constructor(private homeService: HomeService) {
    this.getChartViewCards(localStorage.getItem('username'));
    this.getDeviceCards(localStorage.getItem('username'));
  }

  ngOnInit(): void {
  }

  getChartViewCards(username: string) {
    this.homeService.getChartViewCards(username)
    .subscribe(
      res => {
        console.log('Retorno da requisição de recuperar cards dos gráficos das visões: ' + JSON.stringify(res));
        this.chartViewCards = res;
      }, errorObject => {
        console.log(errorObject.error);
      }
    );
  }

  getDeviceCards(username: string) {
    this.loading = true;
    this.homeService.getDeviceCards(username)
    .subscribe(
      res => {
        console.log('Retorno da requisição de recuperar cards dos dispositivos: ' + JSON.stringify(res));
        this.deviceCards = res;
        this.loading = false;
      }, errorObject => {
        console.log(errorObject.error);
      }
    );
  }

  getDeviceDetails(deviceId: string) {
    this.homeService.getDeviceDetails(deviceId)
    .subscribe(
      res => {
        console.log('Retorno da requisição de recuperar detalhes do dispositivo: ' + JSON.stringify(res));
        this.selectedDevice = res;
        console.log(this.selectedDevice);
      }, errorObject => {
        console.log(errorObject.error);
      }
    );
  }

  openChart(chart: ChartView) {
    this.homeService.createChart(chart);
    this.chartOpen = true;
  }
}