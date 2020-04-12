import { Component, OnInit, Input } from '@angular/core';
import { HomeService } from '../service/home.service';
import { Person } from '../interfaces/person';
import { ViewCard } from '../interfaces/view-card';
import { Device } from '../interfaces/device';
import { Chart } from '../interfaces/chart';
import * as CanvasJS from '../../assets/canvasjs.min';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loading = false;
  chartOpen = false;
  cards: ViewCard[];
  devices: Device[];
  chartCard: Chart;
  //chart: Chart;
  selectedDevice: Device;

  constructor(private homeService: HomeService) {
    this.getCards(localStorage.getItem('username'));
    this.getDevices(localStorage.getItem('username'));
    this.getChart('2', localStorage.getItem('username'));
  }

  ngOnInit(): void {
  }

  getCards(username: string) {
    this.loading = true;
    this.homeService.getCards(username)
    .subscribe(
      res => {
        console.log('Retorno da requisição de recuperar cards das visões: ' + JSON.stringify(res));
        this.cards = res;
        this.loading = false;
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
        this.chartCard = res;
        console.log(this.chartCard);
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

  openChart() {
    this.homeService.createChart(this.chartCard);
    this.chartOpen = true;

    /*let createdChart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
          text: this.chartCard.title
      },
      backgroundColor: "transparent",
      theme: "light2",
      axisX: {
          labelFontSize: 14,
          valueFormatString: "MMM YYYY"
      },
      axisY: {
          labelFontSize: 14,
          prefix: "$"
      },
      toolTip: {
          borderThickness: 0,
          cornerRadius: 0
      },
      data: [{
          type: "column",
          yValueFormatString: "$###,###.##",
          dataPoints: [
              { x: new Date("1 Jan 2015"), y: 868800 },
              { x: new Date("1 Feb 2015"), y: 1071550 },
              { x: new Date("1 Mar 2015"), y: 1286200 },
              { x: new Date("1 Apr 2015"), y: 1106900 },
              { x: new Date("1 May 2015"), y: 1033800 },
              { x: new Date("1 Jun 2015"), y: 1017160 },
              { x: new Date("1 Jul 2015"), y: 1458000 },
              { x: new Date("1 Aug 2015"), y: 1165850 },
              { x: new Date("1 Sep 2015"), y: 1594150 },
              { x: new Date("1 Oct 2015"), y: 1501700 },
              { x: new Date("1 Nov 2015"), y: 1588400 },
              { x: new Date("1 Dec 2015"), y: 1648600 }
          ]
      }]
  });

  this.chartOpen = true;
  createdChart.render();*/

		/*let graph = new CanvasJS.Chart("chartContainer", {
		animationEnabled: true,
		exportEnabled: true,
		title: {
			text: this.chart.description
		},
		data: [{
			type: this.chart.type,
			dataPoints: [
				{ y: 71, label: this.chart.timestamp },
				{ y: 55, label: "Mango" },
				{ y: 50, label: "Orange" },
				{ y: 65, label: "Banana" },
				{ y: 95, label: "Pineapple" },
				{ y: 68, label: "Pears" },
				{ y: 28, label: "Grapes" },
				{ y: 34, label: "Lychee" },
				{ y: 14, label: "Jackfruit" }
			]
		}]
  	});
    
    this.chartOpen = true;
    graph.render();
  }*/
  }
}