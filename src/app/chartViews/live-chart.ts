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
                text: chart.title
            },
            backgroundColor: "transparent",
            theme: "light2",
            // axisX: {
            //     labelFontSize: 14,
            //     // valueFormatString: "MMM YYYY"
            // },
            // axisY: {
            //     labelFontSize: 14,
            //     // prefix: "$"
            // },
            // toolTip: {
            //     borderThickness: 0,
            //     content: "<span style='\"'color: {color};'\"'>{label}</span>: {y} L",
            //     cornerRadius: 0
            // },
            data: [{
                type: "line",
                // yValueFormatString: "$###,###.##",
                dataPoints: chart.dataPoints
                // dataPoints: [
                //     {y: 13.0, label: 'Máquina de lavar roupas'},
                //     {y: 7.2, label: 'Filtro de água'}
                // ]
            }]
        });

        createdChart.render();

        return createdChart;
    }
}