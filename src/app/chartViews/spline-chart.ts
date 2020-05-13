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
            title:{
                text: chart.title
            },
            // axisY: {
            //     title: "Revenue in USD",
            //     valueFormatString: "#0,,.",
            //     suffix: "mn",
            //     prefix: "$"
            // },
            backgroundColor: "transparent",
            data: [{
                type: "splineArea",
                color: "rgba(54,158,173,.7)",
                markerSize: 5,
                // xValueFormatString: "YYYY",
                // yValueFormatString: "$#,##0.##",
                dataPoints: chart.dataPoints
            }]
        });

        createdChart.render();
        
        return createdChart;
    }
}