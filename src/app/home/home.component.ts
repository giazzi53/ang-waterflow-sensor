import { Component, OnInit, Input } from '@angular/core';
import { ViewCardComponent } from '../view-card/view-card/view-card.component';
import { ViewCardService } from '../service/view-card.service';
import { Person } from '../interfaces/person';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cards: ViewCardComponent[];
  a: any;

  constructor(private viewCardService: ViewCardService) { 
    // this.cards = this.getCards();
    console.log(localStorage.getItem('username'));
    this.a = this.getCards(localStorage.getItem('username'));
    console.log(this.a);
  }

  ngOnInit(): void {
  }

  getCards(username: string) {
    return this.viewCardService.getCards(username);
  }

}
