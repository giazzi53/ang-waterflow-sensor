import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class SessionService {
  public userId: string;
  public name: string;

  constructor(private route: Router) { }

  getUserLogged() {
    const userId = localStorage.getItem('user');
    if (!this.userId) {
      this.userId = userId;
    }
    return this.userId;
  }

  saveUserLoggedId(userId: string, name?: string) {
    localStorage.setItem('user', userId);
    if(name != null){
      this.name = name;
      localStorage.setItem('name', name);
    }
    this.userId = userId;
  }

  logoutUser() {
    localStorage.removeItem('user');
    localStorage.removeItem('name');
    this.userId = '';
    this.name = '';
    this.route.navigate(['']);
  }
}
