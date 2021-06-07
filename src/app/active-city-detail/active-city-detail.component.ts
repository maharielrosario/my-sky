import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FullWeatherData, OneDayWeatherData } from '../interfaces';
import moment from 'moment';

@Component({
  selector: 'app-active-city-detail',
  templateUrl: './active-city-detail.component.html',
  styleUrls: ['./active-city-detail.component.scss'],
})
export class ActiveCityDetailComponent implements OnInit, OnChanges {
  @Input() tempScale: string;
  @Input() fullWeatherData: FullWeatherData;
  todaysDate: moment.Moment;
  currentDate: OneDayWeatherData['validDate'];
  dayOfWeek: string;
  time: string;

  displayDayOfWeek(date: string | moment.Moment): string {
    if (!date) {
      date = moment();
    }
    let day;
    if (typeof date === 'string') {
      day = moment(date).format('dddd');
    } else {
      day = date.format('dddd');
    }
    return day;
  }

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
    this.dayOfWeek = this.displayDayOfWeek(this.todaysDate);
  }

  ngOnChanges(): void {
    this.currentDate = this.fullWeatherData?.data[0]?.validDate;
    this.dayOfWeek = this.displayDayOfWeek(this.currentDate);
  }
}
