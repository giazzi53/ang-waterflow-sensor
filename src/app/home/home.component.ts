import { Component, OnInit, Input } from '@angular/core';
import { HomeService } from '../service/home.service';
import { ChartView } from '../interfaces/chartView';
import { Device } from '../interfaces/device';
import { FixedChartViewCard } from '../interfaces/fixedChartViewCard';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loading = false;
  chartOpen = false;
  username: string = localStorage.getItem('username');
  chartViewCards: FixedChartViewCard[];
  //deviceCards: Device[];
  deviceCards: string[];
  chartView: ChartView;
  selectedDevice: Device;

  constructor(private homeService: HomeService) {
    this.getFixedChartViewCards();
    this.getDeviceCards(this.username);
  }

  ngOnInit(): void {
  }

  getFixedChartViewCards() {
    this.homeService.getFixedChartViewCards()
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

  getDeviceDetails(deviceDescription: string) {
    this.homeService.getDeviceDetails(this.username, deviceDescription)
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

  openChart(type: string, title: string) {
    this.homeService.getChartView(type, title, this.username)
    .subscribe(
      res => {
        console.log('Retorno da requisição de recuperar gráfico: ' + JSON.stringify(res));
        this.homeService.openChart(res);
        this.chartOpen = true;
      }, errorObject => {
        console.log(errorObject.error);
      }
    );
  }
}