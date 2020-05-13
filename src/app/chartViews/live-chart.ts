import { ChartView } from 'src/app/interfaces/chartView';
import * as CanvasJS from '../../assets/canvasjs.min';

export class LiveChart {

    constructor () {
    }

    ngOnInit(){
    }

    createLiveChart(chart: ChartView) {
        let createdChart = new CanvasJS.Chart("live-chart", {
            animationEnabled: true,
            exportEnabled: true,
            title: {
                text: chart.title,
                fontFamily: "tahoma"
            },
            toolTip: {
                borderThickness: 0,
                content: "<span style='\"'color: #51CDA0;'\"'>{label}</span>: {y} L",
                cornerRadius: 0
            },
            axisX: {
                labelFontSize: 16,
            },
            axisY: {
                labelFontSize: 16,
            },
            backgroundColor: "transparent",
            theme: "dark1",
            data: [{
                lineColor: "#51CDA0",
                markerSize: 8,
                markerColor: "#51CDA0",
                type: "line",
                dataPoints: chart.dataPoints
            }]
        });

        createdChart.render();

        return createdChart;
    }
}