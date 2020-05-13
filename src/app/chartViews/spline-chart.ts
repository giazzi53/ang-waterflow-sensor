import { ChartView } from 'src/app/interfaces/chartView';
import * as CanvasJS from '../../assets/canvasjs.min';

export class SplineChart {
    
    constructor () {
    }

    ngOnInit(){
    }

    createSplineChart(chart: ChartView) {
        var createdChart = new CanvasJS.Chart("last-week-chart", {
            animationEnabled: true,
            exportEnabled: true,
            title:{
                text: chart.title,
                fontFamily: "tahoma"
            },
            backgroundColor: "transparent",
            axisX: {
                labelFontSize: 16,
            },
            axisY: {
                labelFontSize: 16,
            },
            theme: "dark1",
            toolTip: {
                borderThickness: 0,
                content: "<span style='\"'color: {color};'\"'>{label}</span>: {y} L",
                cornerRadius: 0
            },
            data: [{
                type: "splineArea",
                color: "rgba(255, 115, 114)",
                markerSize: 8,
                dataPoints: chart.dataPoints
            }]
        });

        createdChart.render();
        
        return createdChart;
    }
}