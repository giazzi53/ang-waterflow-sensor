import { ChartView } from 'src/app/interfaces/chartView';
import * as CanvasJS from '../../assets/canvasjs.min';

export class LineChart {
    
    constructor () {
    }

    ngOnInit(){
    }

    createLineChart(chart: ChartView) {
        let createdChart = new CanvasJS.Chart("chartContainer", {
            theme: "light2", // "light1", "dark1", "dark2"
            animationEnabled: true,
            zoomEnabled: true,
            title: {
                text: chart.title
            },
            backgroundColor: "transparent",
            axisY: {
                includeZero: false
            },
            data: [
            {
                type: "line",                
                dataPoints: chart.dataPoints
                // dataPoints: [
                //     {y: 13, label: '2019-08-12 / 21:04:08'},
                //     {y: 7.2, label: '2019-08-13 / 21:04:08'},
                //     {y: 4, label: '2019-08-14 / 21:04:08'}
                // ]
            }]
        });
            
        createdChart.render();

        return createdChart;
    }
}