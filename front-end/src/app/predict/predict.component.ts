import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetStockDataService } from '../services/get-stock-data.service';
import { GetDataService } from '../services/get-data.service';
import { ChartComponent } from '../chart/chart.component';

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.scss']
})

export class PredictComponent implements OnInit, AfterViewInit {

  @ViewChild(ChartComponent) chartComponent: any;

  constructor(
    private getStockService: GetStockDataService,
    private activeRoute: ActivatedRoute,
    private getDataService: GetDataService
  ) { }

  user_id: any;
  logedIn: any;

  newData: any;

  stockId: string = this.activeRoute.snapshot.paramMap.get("stock_id")!;
  stockColor: string = "#FFDB01";
  stokcName: string = "Gold";

  addData(labels: any, newData: any, chart: any) {
    // Add new label
    for (let label of labels)
      chart.data.labels.push(label);
    // chart.data.labels = labels;
    // Add new data
    let data = [];
    for (let i = 0; i < newData.length; i++) {
      data.push({ x: labels[i], y: newData[i] })
    }
    chart.data.datasets[1].data = data;
    // Update the chart
    chart.update();
  }

  ngAfterViewInit(): void {
    console.log(this.chartComponent);
  }


  ngOnInit(): void {
    if (this.stockId == "1") {
      this.stockColor = "#0E197D";
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
          this.addData(labels, predictions, this.chartComponent.chart);
        },
        err => {
          console.log(err);
        }
      )
    }
  }
}
