import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FullWeatherData, OneDayWeatherData } from '../interfaces';
import moment from 'moment';
import { displayDayOfWeek } from '../util';

@Component({
  selector: 'city-details',
  templateUrl: './city-details.component.html',
  styleUrls: ['./city-details.component.scss'],
})
export class CityDetailsComponent implements OnInit, OnChanges {
  @Input() tempScale: string;
  @Input() fullWeatherData: FullWeatherData;
  todaysDate: moment.Moment;
  currentDate: OneDayWeatherData['validDate'];
  dayOfWeek: string;
  time: string;
  displayDayOfWeek = displayDayOfWeek;
  displayDateFormatted(date: string | moment.Moment): string {
    if (!date) {
      date = moment();
    }
    let formattedDay;
    if (typeof date === 'string') {
      formattedDay = moment(date).format('MM/DD/YYYY');
    } else {
      formattedDay = date.format('MM/DD/YYYY');
    }
    return formattedDay;
  }

  displayTime(): string {
    const currentDate = new Date();
    this.time = currentDate.toLocaleString('en-US', {
      timeZone: this.fullWeatherData.timezone,
      hour: 'numeric',
      minute: 'numeric',
    });
    return this.time;
  }

  getWeatherIcon(iconCode: string): string {
    return `../../assets/icons/${iconCode}.png`;
  }

  ngOnInit(): void {
    this.todaysDate = moment();
    this.dayOfWeek = displayDayOfWeek(this.todaysDate);
  }

  ngOnChanges(): void {
    this.currentDate = this.fullWeatherData?.data[0]?.validDate;
    this.dayOfWeek = displayDayOfWeek(this.currentDate);
  }
}
