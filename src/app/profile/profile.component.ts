import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  name: string = 'Guilherme';
  age: number = 20;

  constructor() { }

  ngOnInit(): void {
  }

}
