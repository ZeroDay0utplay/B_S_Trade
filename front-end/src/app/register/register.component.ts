import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registrationForm = new FormGroup({
    full_name: new FormControl(''),
    email: new FormControl(''),
    job: new FormControl(''),
    password: new FormControl(''),
    confirm_password: new FormControl(''),
  });
  hide = true;
  hideConf = true;
  onSubmit() {
    console.log(this.registrationForm.value);
  }  
}
