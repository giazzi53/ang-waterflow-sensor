import { ColumnChart } from "../view/charts/column-chart";
import { PieChart } from '../view/charts/pie-chart';
import { SplineChart } from '../view/charts/spline-chart';

export class ChartType {
    column = ColumnChart;
    pie = PieChart;
    spline = SplineChart;
}