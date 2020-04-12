import { Device } from './device';
import { ChartType } from '../enum/chart-type';

export interface Chart {
  title: string;
  description: string;
  type: string;
  device: Device;
}