import { Component, OnInit } from '@angular/core';
import { Device } from '../interfaces/device';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  device: Device;

  constructor() { }

  ngOnInit(): void {
  }

}
