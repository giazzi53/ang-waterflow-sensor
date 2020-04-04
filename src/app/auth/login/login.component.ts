import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Person } from 'src/app/interfaces/person';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
    callRegisterComponent = false;
    loading = false
  
    @Input() person: Person = <Person>{};
    @Output() id: EventEmitter<string> = new EventEmitter();
    constructor(private authService: LoginService, private router: Router, private snackbar: MatSnackBar) { }
  
    ngOnInit() {
      // if(this.sessionService.getUserLogged() != null){
      //   return this.router.navigate(['home']);
      // }
    }
  
    onSubmit() {
      this.loading = true;
      this.authService.login(this.person.username, this.person.password)
        .subscribe(
          res => {
            this.loading = false;
            // this.sessionService.saveUserLoggedId(res.id, res.firstName);
            console.log('successful login!');
            this.router.navigate(['home']);
          }, error => {
            this.loading = false;
            console.log(error);
            this.snackbar.open('Login ou senha incorretos!', 'Dismiss', {
              duration: 2000,
              panelClass: ['error-snackbar']
            });
          }
        );
    }
  
    toRegister() {
      this.router.navigateByUrl('/register');
    }
  }
  