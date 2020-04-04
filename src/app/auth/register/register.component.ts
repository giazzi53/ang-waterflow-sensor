import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RegisterService } from 'src/app/service/register.service';
import { Person } from 'src/app/interfaces/person';
import { Gender } from 'src/app/interfaces/gender';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup;
  regions: any = ['Norte', 'Nordeste', 'Centro-oeste', 'Sudeste', 'Sul']
  genders: Gender[] = [
    { value: 'F', viewValue: 'Feminino' },
    { value: 'M', viewValue: 'Masculino' },
    { value: 'O', viewValue: 'Não informar' }
  ];

  constructor(private registerService: RegisterService) { 
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
      'street': new FormControl(this.person.street, [Validators.required]),
    });
  }

  onSubmit() {
    this.person = this.userForm.value;
    this.registerService.register(this.person);
  }

  ngOnInit(): void {
    
  }

}
