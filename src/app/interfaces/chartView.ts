import { DataPoint } from './dataPoint';

export interface ChartView {
  chartId: string;
  username: string;
  title: string;
  description: string;
  type: string;
  dataPoints: DataPoint[];
}