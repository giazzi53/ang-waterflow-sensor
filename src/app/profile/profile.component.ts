import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Region } from '../interfaces/region';
import { Gender } from '../interfaces/gender';
import { SessionService } from '../service/session.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Person } from '../interfaces/person';
import { ProfileService } from '../service/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: Person;
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

  constructor(private profileService: ProfileService, private sessionService: SessionService, private router: Router, private snackbar: MatSnackBar) { 
    this.userForm = this.createUser();
  }

  ngOnInit(): void {
    this.retrieveProfileData();
  }

  @Input() person: Person = <Person>{};

  retrieveProfileData(){
    this.profileService.retrieveProfileData(localStorage.getItem('username')).subscribe(
      res => {
        // this.loading = false;
        // this.sessionService.saveUserLogged(this.person.username);
        // this.router.navigate(['home']);
        this.user = res;
        console.log('user is ' + JSON.stringify(this.user));
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
    this.person._id = this.user._id;
    this.profileService.update(this.person, localStorage.getItem('username')).subscribe(
     res => {
        // this.loading = false;
        this.sessionService.saveUserLogged(this.person.username);
        this.router.navigate(['home']);
      }, errorObject => {
        // this.loading = false;
        console.log(errorObject.error);
        this.snackbar.open(errorObject.error, 'Dismiss', {
          duration: 2000,
          panelClass: ['error-snackbar']
        });
      });
  }

  toHome() {
    this.router.navigateByUrl('/home');
  }

}
