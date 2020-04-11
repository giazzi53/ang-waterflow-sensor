import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  chartType: string;
  deviceId: string;
  description: string;
  initialDate: string;
  finalDate: string;

  constructor() { }

  ngOnInit(): void {
  }

}
