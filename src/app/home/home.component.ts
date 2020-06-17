import { Component, OnInit, Input } from '@angular/core';
import { HomeService } from '../service/home.service';
import { ChartView } from '../interfaces/chartView';
import { Device } from '../interfaces/device';
import { FixedChartViewCard } from '../interfaces/fixedChartViewCard';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';
import { Person } from '../interfaces/person';
import { SessionService } from '../service/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loading = false;
  chartOpen = false;
  person: Person;
  interval;
  isDisconnected: boolean = false;
  oldChart: ChartView;
  username: string = localStorage.getItem('username');
  chartViewCards: FixedChartViewCard[];
  devices: Device[];
  currentDevice: Device;
  lastUpdate = new Date();
  chartView: ChartView;
  emptyChartData: boolean = false;
  onlyOnce: boolean = true;

  constructor(private homeService: HomeService, private sessionService: SessionService, private router: Router, public dialog: MatDialog) {
    this.getUserData(this.username);
    this.getDeviceDetails(this.username);
  }

  ngOnInit(): void {
  }

  getUserData(username: string){
    this.homeService.getUserData(username)
    .subscribe(
      res => {
        console.log('Retorno da requisição de recuperar dados do usuário: ' + JSON.stringify(res));
        this.person = res;
      }, errorObject => {
        console.log(errorObject.error);
      }
    );
  }

  getFixedChartViewCards() {
    this.homeService.getFixedChartViewCards()
    .subscribe(
      res => {
        console.log('Retorno da requisição de recuperar cards dos gráficos das visões: ' + JSON.stringify(res));
        this.chartViewCards = res;
        this.chartViewCards.forEach(chartViewCard => {
          this.openChart(chartViewCard.chartId, this.currentDevice.deviceId);
        });
        if(this.onlyOnce == true){
          this.updateData();
          this.onlyOnce = false;
        }
      }, errorObject => {
        console.log(errorObject.error);
      }
    );
  }

  updateData(){
    let self = this;
    this.interval = setInterval(function(){
      self.getDeviceDetails(self.username);
      self.lastUpdate = new Date();
    }, 32000);
  }

  getDeviceDetails(username: string) {
    this.homeService.getDeviceDetails(username)
    .subscribe(
      res => {
        console.log('Retorno da requisição de recuperar detalhes dos dispositivos: ' + JSON.stringify(res));
        this.devices = res;
        if(this.devices.length > 0){
          this.currentDevice = this.devices[0];
        }
        this.getFixedChartViewCards();
      }, errorObject => {
        console.log(errorObject.error);
      }
    );
  }

  openChart(chartId: string, deviceId: string) {
    this.homeService.getChartView(chartId, this.username, deviceId)
    .subscribe(
      res => {
        console.log('Retorno da requisição de recuperar gráfico: ' + JSON.stringify(res));
        if(this.currentDevice !== undefined){
          this.homeService.openChart(res, this.currentDevice.description);
        } else {
          this.homeService.openChart(res);
        }

        if(res.dataPoints.length == 0){
          this.emptyChartData = true;
        }

        if(chartId == '4'){
          if(this.oldChart != undefined && JSON.stringify(this.oldChart.dataPoints) === JSON.stringify(res.dataPoints)){
            this.isDisconnected = true;
          }
          this.oldChart = res;
        }
      }, errorObject => {
        console.log(errorObject.error);
      }
    );
  }

  openHelp(){
    this.dialog.open(HelpDialogComponent);
  }
  
  openPreviousDevice(){
    if(this.devices.indexOf(this.currentDevice) === 0){
      this.currentDevice = this.devices[this.devices.length - 1];
    } else {
      this.currentDevice = this.devices[this.devices.indexOf(this.currentDevice) - 1];
    }
    this.openChart('4', this.currentDevice.deviceId);
  }

  openNextDevice(){
    if(this.devices.indexOf(this.currentDevice) === this.devices.length - 1){
      this.currentDevice = this.devices[0];
    } else {
      this.currentDevice = this.devices[this.devices.indexOf(this.currentDevice) + 1];
    }
    this.openChart('4', this.currentDevice.deviceId);
  }

  toLogin() {
    clearInterval(this.interval);
    this.sessionService.logoutUser();
  }

  toProfile() {
    clearInterval(this.interval);
    this.router.navigateByUrl('/profile');
  }
}