import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { GetStockDataService } from '../services/get-stock-data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  chart: any;

  canvas: HTMLCanvasElement = document.createElement('canvas');
  ctx: CanvasRenderingContext2D = this.canvas.getContext('2d')!;

  data: any;

  constructor(
    private getStockDataService: GetStockDataService
  ) { }


  ngOnInit() {
    this.chartStock("Apple", "#0E197D", "1");
  }
  

  divClick() {
    var chartExist = Chart.getChart("myChart"); // <canvas> id
    if (chartExist != undefined) 
      chartExist.destroy();
  } 

  chartStock(stockName: string, stockColor: string, id: string) {
    this.divClick();
    console.log(id);
    this.getStockDataService.getData('/stocks/'+id).subscribe(
      response => {
        console.log(response);
        this.chart = new Chart('myChart', {
          type: 'line',
          data: {
            labels: response["Date"],
            datasets: [{
              label: stockName,
              borderWidth: 1,
              pointRadius: 0,
              data: response["Values"],
              borderColor: stockColor,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: stockColor
            }
            ],
          },
          options: {
            plugins: {
              legend: {
                display: false
              }
            },
            animation: {
              duration: 10000,
              easing: 'easeOutQuart'
            },
            scales: {
              x: {
                grid: { display: false }
              },
              y: {
                grid: { display: false }
              }
            }
            // animation: this.animateChart(),
          }
        });
      })
  }

  animateChart() {
    const totalDuration = 10000;
    const delayBetweenPoints = totalDuration / this.data.length;
    const previousY = (ctx: any) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
    const animation = {
      x: {
        type: 'number',
        easing: 'linear',
        duration: delayBetweenPoints,
        from: NaN, // the point is initially skipped
        delay(ctx: any) {
          if (ctx.type !== 'data' || ctx.xStarted) {
            return 0;
          }
          ctx.xStarted = true;
          return ctx.index * delayBetweenPoints;
        }
      },
      y: {
        type: 'number',
        easing: 'linear',
        duration: delayBetweenPoints,
        from: previousY,
        delay(ctx: any) {
          if (ctx.type !== 'data' || ctx.yStarted) {
            return 0;
          }
          ctx.yStarted = true;
          return ctx.index * delayBetweenPoints;
        }
      }
    };
  }

}
