import { Chart } from 'src/app/interfaces/chart';
import * as CanvasJS from '../../../assets/canvasjs.min';

export class ColumnChart {
    
    constructor () {
        //this.createColumnChart(this.chart);
    }

    ngOnInit(){
    }

    createColumnChart(chart: Chart) {
        let createdChart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            exportEnabled: true,
            title: {
                text: chart.title
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

        createdChart.render();

        return createdChart;
    }
}