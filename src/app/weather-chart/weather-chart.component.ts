import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { FullWeatherData } from '../interfaces';
import { displayDayOfWeek, deepEqual } from '../util';

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
    font: {
      size: 30,
    },
    plugins: {
      title: {
        display: true,
        text: "This Week's Weather",
        color: '#fa9457',
      },
      legend: {
        labels: {
          font: {
            size: 40,
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        // grid: {
        //   color: '#fa9457',
        // },
        // ticks: {
        //   color: '#fa9457',
        // },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Temperature',
        },
        // min: 0,
        // max: 100,
        // grid: {
        //   color: '#fa9457',
        // },
        ticks: {
          color: '#fa9457',
          stepSize: 5,
        },
      },
    },
  };
  public chartDatasets: ChartDataset[] = [
    {
      data: [],
      backgroundColor: '#fa9457',
      borderColor: '#fa9457',
      pointBackgroundColor: '#fff',
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
  updateWeatherChart() {
    if (this.chartDatasets[0].data.length > 0 && this.chartLabels.length > 0) {
      this.chartDatasets[0].data = [];
      this.chartLabels = [];
    }
    this.fullWeatherData.data.forEach((day) => {
      this.chartDatasets[0].data.push(day.temp);
      this.chartLabels.push(displayDayOfWeek(day.datetime));
    });
    this.baseChart.update();
  }
  ngOnChanges(changes: SimpleChanges): void {
    const hasWeatherDataChanged = !deepEqual(
      changes.fullWeatherData?.currentValue,
      changes.fullWeatherData?.previousValue
    );
    if (this.fullWeatherData && hasWeatherDataChanged) {
      this.updateWeatherChart();
    }
  }
}
