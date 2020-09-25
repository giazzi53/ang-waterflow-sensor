import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Person } from 'src/app/interfaces/person';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/service/auth.service';
import { SessionService } from 'src/app/service/session.service';

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
    constructor(private authService: AuthService, private sessionService: SessionService, private router: Router, private snackbar: MatSnackBar) { }
  
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
            this.sessionService.saveUserLogged(res.username);
            // this.sessionService.saveUserLogged(this.person.username);
            this.router.navigate(['home']);
          }, errorObject => {
            this.loading = false;
            if(errorObject.error instanceof ProgressEvent){
              this.snackbar.open("Erro ao realizar operação", 'Dismiss', {
                duration: 3000,
                panelClass: ['error-snackbar']
              });
            } else {
              this.snackbar.open(errorObject.message, 'Dismiss', {
                duration: 3000,
                panelClass: ['error-snackbar']
              });
            }        
          }
        );
    }
  
    toRegister() {
      this.router.navigateByUrl('/register');
    }
  }
  