import { ChartView } from 'src/app/interfaces/chartView';
import * as CanvasJS from '../../assets/canvasjs.min';

export class SplineChart {
    
    constructor () {
    }

    ngOnInit(){
    }

    createSplineChart(chart: ChartView) {
        let createdChart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            backgroundColor: "transparent",
            theme: "light2",
            toolTip: {
                borderThickness: 0,
                cornerRadius: 0
            },
            axisX: {
                labelFontSize: 14,
                maximum: new Date("31 Dec 2015"),
                valueFormatString: "MMM YYYY"
            },
            axisY: {
                gridThickness: 0,
                labelFontSize: 14,
                lineThickness: 2
            },
            data: [{
                type: "spline",
                dataPoints: [
                    { x: new Date("1 Jan 2015"), y: 17376 },
                    { x: new Date("1 Feb 2015"), y: 21431 },
                    { x: new Date("1 Mar 2015"), y: 25724 },
                    { x: new Date("1 Apr 2015"), y: 22138 },
                    { x: new Date("1 May 2015"), y: 20676 },
                    { x: new Date("1 Jun 2015"), y: 25429 },
                    { x: new Date("1 Jul 2015"), y: 29160 },
                    { x: new Date("1 Aug 2015"), y: 23317 },
                    { x: new Date("1 Sep 2015"), y: 31883 },
                    { x: new Date("1 Oct 2015"), y: 30034 },
                    { x: new Date("1 Nov 2015"), y: 31768 },
                    { x: new Date("1 Dec 2015"), y: 41215 }
                ]
            }]
        });

        createdChart.render();
        
        return createdChart;
    }
}