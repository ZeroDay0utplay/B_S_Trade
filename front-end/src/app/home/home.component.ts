import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../services/get-data.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private getService: GetDataService){
    this.logedIn = false;
    this.profile_pic = "";
    this.user_id = "";
  }

  profile_pic: string;
  user_id: string;
  logedIn: boolean;

  
  ngOnInit(): void {
    this.getService.getData('/')
    .subscribe(
      data => {
        const profile_pic = data.photo;
        const user_id = data.user_id;
        this.profile_pic = profile_pic;
        this.logedIn = true;
        this.user_id = user_id;
      },
      error => {
          this.logedIn = false;
      }
    );
    console.log(this.logedIn);
    
  }
}
