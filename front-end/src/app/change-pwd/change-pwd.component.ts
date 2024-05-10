import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../Interfaces/user';
import { ActivatedRoute } from '@angular/router';
import { UpdateService } from '../services/update.service';

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.scss']
})
export class ChangePwdComponent {
  constructor(
    private updateService: UpdateService,
    private activeRoute: ActivatedRoute
  ){} //private cookieService: CookieService){}

  resetForm = new FormGroup({
    password: new FormControl(''),
    confirm_password: new FormControl('')
  });
  
  hide = true;
  hideConf = true;

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
    if (this.resetForm.valid){
      let password = this.resetForm.value.password;
      let confirm_password = this.resetForm.value.confirm_password;
      if (password !== confirm_password){
        this.setAllFalse();
        this.alert_danger = true;
        this.alert_message_danger = "Password and Confirm Password do not match!";
        return;
      }
      delete this.resetForm.value.confirm_password;
      const body: User = this.resetForm.value as User;
      const user_id = this.activeRoute.snapshot.paramMap.get('user_id');
      console.log(user_id);
      this.updateService.update(body, '/reset/'+user_id)
      .subscribe(response => {
        const message = response.body.message;
        console.log(message);
        this.setAllFalse();
        this.alert_success = true;
        this.alert_message_success = message;
      },
      error => {
        let statusCode = error.status;
        console.log(error.status);
        let message = error.error.message;
        this.setAllFalse();
        if (statusCode == 403){
          this.alert_warning = true;
          this.alert_message_warning = message;
        }
        else{
          this.alert_danger = true;
          this.alert_message_danger = message;
        }
      }
    );
    }
  }
}
