import { DataPoint } from './dataPoint';

export interface ChartView {
  chartId: string;
  title: string;
  type: string;
  dataPoints: DataPoint[];
}