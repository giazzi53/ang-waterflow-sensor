import { Component, OnInit, Input } from '@angular/core';
import { HomeService } from '../service/home.service';
import { ChartView } from '../interfaces/chartView';
import { Device } from '../interfaces/device';
import { FixedChartViewCard } from '../interfaces/fixedChartViewCard';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';
import { Person } from '../interfaces/person';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loading = false;
  chartOpen = false;
  person: Person;
  username: string = localStorage.getItem('username');
  chartViewCards: FixedChartViewCard[];
  devices: Device[];
  currentDevice: Device;
  lastUpdate = new Date();
  chartView: ChartView;
  selectedDevice: Device;
  emptyChartData: boolean = false;

  constructor(private homeService: HomeService, private router: Router, public dialog: MatDialog) {
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
    setInterval(function(){
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
        this.currentDevice = this.devices[0];
        console.log(this.selectedDevice);
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
    this.dialog.open(HelpDialogComponent, {
      width: '35%'
    })
  }

  toLogin() {
    this.router.navigateByUrl('/');
  }
}