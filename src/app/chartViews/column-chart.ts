import { ChartView } from 'src/app/interfaces/chartView';
import * as CanvasJS from '../../assets/canvasjs.min';

export class ColumnChart {
    
    constructor () {
    }

    ngOnInit(){
    }

    createColumnChart(chart: ChartView) {
        let createdChart = new CanvasJS.Chart("mean-weekday-chart", {
            animationEnabled: true,
            // exportEnabled: true,
            title: {
                text: chart.title,
                fontFamily: "tahoma",
                fontSize: 18
            },
            backgroundColor: "transparent",
            theme: "dark1",
            axisX: {
                labelFontSize: 14,
            },
            axisY: {
                labelFontSize: 14,
            },
            toolTip: {
                borderThickness: 0,
                content: "<span style='\"'color: {color};'\"'>{label}</span>: {y} L",
                cornerRadius: 0
            },
            data: [{
                type: "column",
                dataPoints: chart.dataPoints
            }]
        });

        createdChart.render();

        return createdChart;
    }
}