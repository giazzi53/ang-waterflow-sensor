import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class SessionService {
  public username: string;

  constructor(private route: Router) { }

  // getUserLogged() {
  //   const userId = localStorage.getItem('user');
  //   if (!this.userId) {
  //     this.userId = userId;
  //   }
  //   return this.userId;
  // }

  saveUserLogged(username: string) {
    this.username = username;
    localStorage.setItem('username', username);
  }

  logoutUser() {
    localStorage.removeItem('username');
    // localStorage.removeItem('name');
    // this.userId = '';
    this.username = '';
    this.route.navigate(['']);
  }
}
