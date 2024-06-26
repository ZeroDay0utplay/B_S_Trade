import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostDataService } from '../services/post-data.service';
import { User } from '../Interfaces/user';
import { EmailValidatorService } from '../services/email-validator.service';
// import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{

  constructor(private postDataService: PostDataService){} //private cookieService: CookieService){}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, new EmailValidatorService().emailValidator()]),
    password: new FormControl(''),
  });
  
  hide = true;

  alert_success = false;
  alert_danger = false;
  alert_warning = false;
  
  alert_message_success = "";
  alert_message_danger = "";
  alert_message_warning = "";

  setAllFalse(){
    this.alert_danger = false;
    this.alert_success = false;
    this.alert_warning = false;
  }

  onSubmit() {
    if (this.loginForm.valid){
      const body: User = this.loginForm.value as User;
      this.postDataService.postData('/login', body)
      .then(response => {
        const message = response.message;
        const auth_token = response.auth_token;
        // this.cookieService.set("auth_token", auth_token);
        document.cookie = `auth_token=${auth_token}`;
        this.setAllFalse();
        this.alert_success = true;
        this.alert_message_success = message;
      })
      .catch(error => {
        let statusCode = error.status;
        let message = error.error.message;
        this.setAllFalse();
        if (statusCode == 406){
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