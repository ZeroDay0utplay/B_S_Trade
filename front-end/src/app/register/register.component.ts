import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostDataService } from '../services/post-data.service';
import { User } from '../Interfaces/user';
import { EmailValidatorService } from '../services/email-validator.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registrationForm = new FormGroup({
    full_name: new FormControl(''),
    email: new FormControl('', [Validators.required, new EmailValidatorService().emailValidator()]),
    job: new FormControl(''),
    password: new FormControl(''),
    confirm_password: new FormControl(''),
  });
  hide = true;
  hideConf = true;
  
  alert_success = false;
  alert_message_success = "";
  alert_message_danger = "";
  alert_danger = false;
  alert_warning = false;
  alert_message_warning = "";

  constructor(private postDataService: PostDataService){}

  onSubmit() {
    if (this.registrationForm.valid){
      let password = this.registrationForm.value.password;
      let confirm_password = this.registrationForm.value.confirm_password;
      
      if (password !== confirm_password){
        this.alert_danger = true;
        this.alert_message_danger = "Password and Confirm Password do not match!";
        return;
      }
      
      delete this.registrationForm.value.confirm_password;
      const body: User = this.registrationForm.value as User;
      this.postDataService.postData('/register', body)
      .then(response => {
        const message = response.message;
        this.alert_success = true;
        this.alert_message_success = message;
      })
      .catch(error => {
        let statusCode = error.status;
        let message = error.error.message;
        if (statusCode === 411){
          this.alert_warning = true;
          this.alert_message_warning = message;
        }
        else{
          this.alert_danger = true;
          this.alert_message_danger = message;
        }
      });

          
    }
    
  }
}
