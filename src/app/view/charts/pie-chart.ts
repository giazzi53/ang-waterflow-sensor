import { Chart } from 'src/app/interfaces/chart';
import * as CanvasJS from '../../../assets/canvasjs.min';

export class PieChart {
    
    constructor () {
    }

    ngOnInit(){
    }

    createPieChart(chart: Chart) {
        let createdChart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            theme: "light2",
            legend: {
                fontSize: 14
            },
            toolTip: {
                borderThickness: 0,
                content: "<span style='\"'color: {color};'\"'>{name}</span>: ${y} (#percent%)",
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
                dataPoints: [
                    {  y: 6289855, name:"Product A", indexLabel: "Product A - 41%", legendText: "Product A", exploded: true },
                    {  y: 2761400, name:"Product B", indexLabel: "Product B - 18%", legendText: "Product B" },
                    {  y: 3681866, name:"Product C", indexLabel: "Product C - 24%", legendText: "Product C", color: "#8064a1" },
                    {  y: 2607989, name:"Product D", indexLabel: "Product D - 17%", legendText: "Product D" }
                ]
            }]
        });

        createdChart.render();

        return createdChart;
    }
}