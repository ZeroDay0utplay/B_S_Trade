import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit{
  chart: any;

  canvas: HTMLCanvasElement = document.createElement('canvas');
  ctx: CanvasRenderingContext2D = this.canvas.getContext('2d')!;

  labels = Array.from({length: 1000}, (_, i) => `Label ${i + 1}`);
  data = Array.from({length: 1000}, () => Math.floor(Math.random() * 1000));
  data2 = Array.from({length: 1000}, () => Math.floor(Math.random() * 1000));
  
  
  ngOnInit() {
    this.chart = new Chart('myChart', {
      type: 'line',
      data: {
        labels: this.genData()[2],
        datasets: [{
          label: 'My Dataset',
          borderWidth: 1,
          pointRadius: 0,
          data: this.genData()[0],
          borderColor: '#FFDB01'
        },
        {
          label: 'My Dataset',
          borderWidth: 1,
          pointRadius: 0,
          data: this.genData()[1],
          borderColor: '#0E197D'
        }
      ],
      },
      options: {
        animation: {
          duration: 10000,
          easing: 'easeInOutQuart'
        }
        // animation: this.animateChart(),
      }
    });
  }

  genData(){
    const data = [];
    const data2 = [];
    const labels = [];
    let prev = 100;
    let prev2 = 80;
    for (let i = 0; i < 1000; i++) {
      labels.push(i);
      prev += 5 - Math.random() * 10;
      data.push(prev);
      prev2 += 5 - Math.random() * 10;
      data2.push(prev2);
    }
    return [data, data2, labels];
  }

  animateChart(){
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
