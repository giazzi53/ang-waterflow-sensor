import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RegisterService } from 'src/app/service/register.service';
import { Person } from 'src/app/interfaces/person';
import { Gender } from 'src/app/interfaces/gender';
import { Region } from 'src/app/interfaces/region';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup;
  regions: Region[] = [
    { value: 'NORTH', viewValue: 'Norte' },
    { value: 'NORTHEAST', viewValue: 'Nordeste' },
    { value: 'CENTER_EAST', viewValue: 'Centro-oeste' },
    { value: 'SOUTHEAST', viewValue: 'Sudeste' },
    { value: 'SOUTH', viewValue: 'Sul' }
  ];
  genders: Gender[] = [
    { value: 'FEMALE', viewValue: 'Feminino' },
    { value: 'MALE', viewValue: 'Masculino' },
    { value: 'UNINFORMED', viewValue: 'Não informar' }
  ];

  constructor(private registerService: RegisterService, private sessionService: SessionService, private router: Router, private snackbar: MatSnackBar) { 
    this.userForm = this.createUser();
  }

  @Input() person: Person = <Person>{};

  createUser() {
    return new FormGroup({
      'username': new FormControl(this.person.username, [Validators.required]),
      'password': new FormControl(this.person.password, [Validators.required]),
      'name': new FormControl(this.person.name, [Validators.required]),
      'email': new FormControl(this.person.email, [Validators.required, Validators.email]),
      'sex': new FormControl(this.person.sex, [Validators.required]),
      'region': new FormControl(this.person.region, [Validators.required]),
      'phoneNumber': new FormControl(this.person.phoneNumber, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      'address': new FormControl(this.person.address, [Validators.required]),
    });
  }

  onSubmit() {
    this.person = this.userForm.value;
    this.registerService.register(this.person).subscribe(
      res => {
        // this.loading = false;
        this.sessionService.saveUserLogged(res.username);
        this.router.navigate(['home']);
        console.log(1111)
      }, errorObject => {
        // this.loading = false;
        console.log(errorObject.error);
        this.snackbar.open(errorObject.error, 'Dismiss', {
          duration: 2000,
          panelClass: ['error-snackbar']
        });
      });
  }

  ngOnInit(): void {
    
  }

}
