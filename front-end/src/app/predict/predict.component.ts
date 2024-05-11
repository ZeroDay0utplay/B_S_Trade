import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../services/get-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.scss']
})
export class PredictComponent implements OnInit{
  constructor(
    private getService: GetDataService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const stock_id = this.activeRoute.snapshot.paramMap.get('stock_id');
    this.getService.getData('/predict/'+stock_id).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }
}
