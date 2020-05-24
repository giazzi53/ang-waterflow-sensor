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
  onlyOnce = true;
  person: Person;
  interval;
  username: string = localStorage.getItem('username');
  chartViewCards: FixedChartViewCard[];
  devices: Device[];
  currentDevice: Device;
  lastUpdate = new Date();
  chartView: ChartView;
  selectedDevice: Device;
  emptyChartData: boolean = false;

  constructor(private homeService: HomeService, private sessionService: SessionService, private router: Router, public dialog: MatDialog) {
    this.getUserData(this.username);
    this.getFixedChartViewCards();
    this.getDeviceDetails(this.username);
  }

  ngOnInit(): void {
  }

  getUserData(username: string){
    this.homeService.getUserData(username)
    .subscribe(
      res => {
        console.log('Retorno da requisição de recuperar dados do usuário: ' + res);
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
          this.openChart(chartViewCard.chartId);
        });
        this.updateData();
      }, errorObject => {
        console.log(errorObject.error);
      }
    );
  }

  updateData(){
    let self = this;
    this.interval = setInterval(function(){
      self.chartViewCards.forEach(chartViewCard => {
        self.openChart(chartViewCard.chartId);
      });
      self.getDeviceDetails(self.username);
      self.lastUpdate = new Date();
    }, 30000);
  }

  getDeviceDetails(username: string) {
    this.homeService.getDeviceDetails(username)
    .subscribe(
      res => {
        console.log('Retorno da requisição de recuperar detalhes dos dispositivos: ' + JSON.stringify(res));
        this.devices = res;
        if(this.onlyOnce){
          this.currentDevice = this.devices[0];
          this.onlyOnce = false;
        }
      }, errorObject => {
        console.log(errorObject.error);
      }
    );
  }

  openChart(chartId: string) {
    this.homeService.getChartView(chartId, this.username)
    .subscribe(
      res => {
        console.log('Retorno da requisição de recuperar gráfico: ' + JSON.stringify(res));
        this.homeService.openChart(res);
        if(res.dataPoints.length == 0){
          this.emptyChartData = true;
        }
      }, errorObject => {
        console.log(errorObject.error);
      }
    );
  }

  openHelp(){
    // this.dialog.open(HelpDialogComponent, {
    //   width: '35%'
    // })
    this.dialog.open(HelpDialogComponent);
  }
  
  openPreviousDevice(){
    if(this.devices.indexOf(this.currentDevice) === 0){
      this.currentDevice = this.devices[this.devices.length - 1];
    } else {
      this.currentDevice = this.devices[this.devices.indexOf(this.currentDevice) - 1];
    }
  }

  openNextDevice(){
    if(this.devices.indexOf(this.currentDevice) === this.devices.length - 1){
      this.currentDevice = this.devices[0];
    } else {
      this.currentDevice = this.devices[this.devices.indexOf(this.currentDevice) + 1];
    }
  }

  toLogin() {
    clearInterval(this.interval);
    this.sessionService.logoutUser();
  }
}