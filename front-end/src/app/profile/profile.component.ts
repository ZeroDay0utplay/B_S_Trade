import { Component, OnInit, getDebugNode } from '@angular/core';
import { GetDataService } from '../services/get-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  constructor(private getDataService: GetDataService, private route: ActivatedRoute){}
  
  name = "User";

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    const data = this.getDataService.getData('/profile/'+userId)
    .subscribe(
      data => {
        this.name = data.name.full_name;
      }
    )
  }

}
