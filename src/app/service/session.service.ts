import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class SessionService {
  public username: string;

  constructor(private route: Router) { }

  saveUserLogged(username: string) {
    this.username = username;
    localStorage.setItem('username', username);
  }

  logoutUser() {
    localStorage.removeItem('username');
    this.username = '';
    this.route.navigateByUrl('/');
  }
}
