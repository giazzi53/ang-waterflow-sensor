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
            data: [{
                type: "line",
                dataPoints: chart.dataPoints
            }]
        });

        createdChart.render();

        return createdChart;
    }
}