import { Component, Input, OnInit } from '@angular/core';
import { GetDataService } from '../services/get-data.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit{
  @Input() logedIn: any;
  @Input() user_id: any;
  notifications: any;
  constructor(
    private getDataService: GetDataService,
  ){}

  ngOnInit(): void{
    this.getDataService.getData('/notifs').subscribe(response => {
      this.notifications = response.message;
    });
  }
}