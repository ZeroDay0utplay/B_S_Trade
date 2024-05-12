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
    this.user_id = "";
  }

  user_id: any;
  logedIn: any;

  
  ngOnInit(): void {
    this.getService.getData('/')
    .subscribe(
      data => {
        this.logedIn = true;
        this.user_id = data.user_id;
      },
      error => {
          this.logedIn = false;
      }
    );
  }
}
