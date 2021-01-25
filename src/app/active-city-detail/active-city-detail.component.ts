import { Component, Input, OnChanges } from '@angular/core';
import { CityWeatherData } from '../interfaces';

@Component({
  selector: 'app-active-city-detail',
  templateUrl: './active-city-detail.component.html',
  styleUrls: ['./active-city-detail.component.scss'],
})
export class ActiveCityDetailComponent implements OnChanges {
  @Input() tempScale: string;
  @Input() weatherData: CityWeatherData;
  date: Date;
  formattedDate = new Date().toLocaleDateString('en-US');
  currentDay: string;
  time: string;
  daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  iconUrl: string;

  ngOnChanges(): void {
    this.date = new Date();
    const day = this.date.getDay();
    this.currentDay = this.daysOfWeek[day];
    this.time = this.date.toLocaleTimeString('en-US', {
      timeZone: this.weatherData.timezone,
      hour: '2-digit',
      minute: '2-digit',
    });
    this.iconUrl = `../../assets/icons/${this.weatherData.weather.icon}.png`;
  }
}
