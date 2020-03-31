import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RegisterService } from 'src/app/service/register.service';
import { Person } from 'src/app/interfaces/person';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup;
  states: any = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'TO'];
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
      'name': new FormControl(this.person.name, [Validators.required]),
      'email': new FormControl(this.person.email, [Validators.required, Validators.email]),
      'password': new FormControl(this.person.password, [Validators.required, Validators.minLength(6), Validators.maxLength(8)]),
      'sex': new FormControl(this.person.sex, [Validators.required]),
      'phoneNumber': new FormControl(this.person.phoneNumber, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
    });
  }

  onSubmit() {
    this.person = this.userForm.value;
    this.registerService.register(this.person);
  }

  ngOnInit(): void {
    
  }

}

interface Gender {
  value: string;
  viewValue: string;
}
