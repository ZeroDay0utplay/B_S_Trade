import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit{
  @Input() logedIn: any;
  @Input() profile_pic: any;
  @Input() user_id: any;
  constructor(){}

  ngOnInit(): void {
    if (this.profile_pic === null){
      this.profile_pic = "../../assets/images/carbon_user-avatar.png";
    }
    else{
      this.profile_pic = `data:image/png;base64,${this.profile_pic}`;
    }
  }

}
