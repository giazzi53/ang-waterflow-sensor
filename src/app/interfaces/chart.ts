import { Device } from './device';

export interface Chart {
  title: string;
  description: string;
  chartType: string;
  device: Device;
}