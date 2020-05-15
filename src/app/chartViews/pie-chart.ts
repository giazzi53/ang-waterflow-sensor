import { ChartView } from 'src/app/interfaces/chartView';
import * as CanvasJS from '../../assets/canvasjs.min';

export class PieChart {
    
    constructor () {
    }

    ngOnInit(){
    }

    createPieChart(chart: ChartView) {
        let createdChart = new CanvasJS.Chart("total-devices-chart", {
            animationEnabled: true,
            title: {
                text: chart.title,
                fontFamily: "tahoma",
                fontSize: 18
            },
            exportEnabled: true,
            backgroundColor: "transparent",
            theme: "dark1",
            legend: {
                fontSize: 14
            },
            toolTip: {
                borderThickness: 0,
                content: "<span style='\"'color: {color};'\"'>{name}</span>: {y} L (#percent%)",
                cornerRadius: 0
            },
            data: [{       
                indexLabelFontColor: "#676464",
                indexLabelFontSize: 14,
                legendMarkerType: "square",
                legendText: "{indexLabel}",
                showInLegend: true,
                startAngle:  90,
                type: "pie",
                dataPoints: chart.dataPoints
            }]
        });

        createdChart.render();

        return createdChart;
    }
}