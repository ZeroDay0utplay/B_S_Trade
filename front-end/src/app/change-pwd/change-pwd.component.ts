import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../Interfaces/user';
import { EmailValidatorService } from '../services/email-validator.service';
import { PostDataService } from '../services/post-data.service';

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.scss']
})
export class ChangePwdComponent {
  constructor(private postDataService: PostDataService){} //private cookieService: CookieService){}

  forgetForm = new FormGroup({
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
    if (this.forgetForm.valid){
      const body: User = this.forgetForm.value as User;
      this.postDataService.postData('/sendMFP', body)
      .then(response => {
        const message = response.message;
        console.log(message);
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
