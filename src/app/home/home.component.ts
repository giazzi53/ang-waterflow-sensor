import { Component, OnInit, Input } from '@angular/core';
import { HomeService } from '../service/home.service';
import { Person } from '../interfaces/person';
import { ViewCard } from '../interfaces/view-card';
import { Device } from '../interfaces/device';
import { Chart } from '../interfaces/chart';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cards: ViewCard[];
  devices: Device[];
  chart: Chart;
  selectedDevice: Device;

  constructor(private homeService: HomeService) { 
    this.getCards(localStorage.getItem('username'));
    this.getDevices(localStorage.getItem('username'));
    this.getChart('1', localStorage.getItem('username'));
  }

  ngOnInit(): void {
  }

  getCards(username: string) {
    this.homeService.getCards(username)
    .subscribe(
      res => {
        console.log('Retorno da requisição de recuperar cards das visões: ' + JSON.stringify(res));
        this.cards = res;
      }, errorObject => {
        console.log(errorObject.error);
      }
    );
  }

  getDevices(username: string) {
    this.homeService.getDevices(username)
    .subscribe(
      res => {
        console.log('Retorno da requisição de recuperar dispositivos: ' + JSON.stringify(res));
        this.devices = res;
        console.log(this.devices);
      }, errorObject => {
        console.log(errorObject.error);
      }
    );
  }

  getChart(chartId: string, username: string) {
    this.homeService.getChart(chartId, username)
    .subscribe(
      res => {
        console.log('Retorno da requisição de recuperar gráfico: ' + JSON.stringify(res));
        this.chart = res;
        console.log(this.chart);
      }, errorObject => {
        console.log(errorObject.error);
      }
    );
  }

  openDevice(deviceId: string) {
    this.homeService.openDevice(deviceId)
    .subscribe(
      res => {
        console.log('Retorno da requisição de abrir dispositivo: ' + JSON.stringify(res));
        this.selectedDevice = res;
        console.log(this.selectedDevice);
      }, errorObject => {
        console.log(errorObject.error);
      }
    );
  }
}
