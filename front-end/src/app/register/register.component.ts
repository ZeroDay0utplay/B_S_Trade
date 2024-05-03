import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PostDataService } from '../services/post-data.service';
import { User } from '../Interfaces/user';


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
  modal = "";

  constructor(private postDataService: PostDataService){}

  onSubmit() {
    if (this.registrationForm.valid){
      delete this.registrationForm.value.confirm_password;
      const body: User = this.registrationForm.value as User;
      this.postDataService.postData('/register', body)
      .then(response => {
        const message = response.message;
        this.modal="successModal";
      })
      .catch(error => {
        let statusCode = error.status;
        let message = error.error.message;
      });

          
    }
    console.log(this.modal);
    
  }
}
