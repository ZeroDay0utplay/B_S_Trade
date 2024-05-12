import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetStockDataService } from '../services/get-stock-data.service';
import { GetDataService } from '../services/get-data.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.scss']
})

export class PredictComponent implements OnInit {

  @ViewChild('myChart') chartCanvas: any;
  chart: any;

  constructor(
    private getStockService: GetStockDataService,
    private activeRoute: ActivatedRoute,
    private getDataService: GetDataService
  ) { }

  user_id: any;
  logedIn: any;

  stockId: string = this.activeRoute.snapshot.paramMap.get("stock_id")!;
  stockColor: string = "#FFDB01";
  stokcName: string = "Gold";

  addData(label: any, newData: any, chart: any) {
    // Add new label
    chart.data.labels.push(label);

    // Add new data
    chart.data.datasets.forEach((dataset: any) => {
      dataset.data.push(newData);
    });

    // Update the chart
    chart.update();
  }


  ngOnInit(): void {
    if (this.stockId == "1"){
      this.stockColor  = "#0E197D";
      this.stokcName = "Apple";
    }

    this.getDataService.getData('/')
      .subscribe(
        data => {
          this.logedIn = true;
          this.user_id = data.user_id;
        },
        error => {
          this.logedIn = false;
        }
      );
    let element = document.getElementById('chart-index');
    if (element) {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      } else {
        element.remove();
      }
    }
  }

  predict() {
    if (this.logedIn == true) {
      this.getStockService.getData('/predict/' + this.stockId).subscribe(
        res => {
          const labels = res.labels;
          const predictions = res.predictions;
          console.log(predictions);
          console.log(labels);

        },
        err => {
          console.log(err);
        }
      )
    }
  }
}
