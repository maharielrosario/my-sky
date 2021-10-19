import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { FullWeatherData } from '../interfaces';
import { displayDayOfWeek } from '../util';

@Component({
  selector: 'weather-chart',
  templateUrl: './weather-chart.component.html',
  styleUrls: ['./weather-chart.component.scss'],
})
export class WeatherChartComponent implements OnChanges {
  @Input() fullWeatherData: FullWeatherData;
  @ViewChild(BaseChartDirective) baseChart;
  public chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "This Week's Weather",
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Days of the week',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Temperature',
        },
      },
    },
  };
  public chartDatasets: ChartDataset[] = [
    {
      data: [],
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      fill: 'origin',
    },
  ];
  public chartLabels = [];
  public chartLegend = false;
  public chartType: ChartType = 'line';
  public chartPlugins = [];
  ngOnChanges(): void {
    if (this.fullWeatherData) {
      if (
        this.chartDatasets[0].data.length > 0 &&
        this.chartLabels.length > 0
      ) {
        this.chartDatasets[0].data = [];
        this.chartLabels = [];
      }
      this.fullWeatherData.data.forEach((day) => {
        this.chartDatasets[0].data.push(day.temp);
        this.chartLabels.push(displayDayOfWeek(day.datetime));
      });
      this.baseChart.update();
    }
  }
}
