import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FullWeatherData } from '../interfaces';

@Component({
  selector: 'app-active-city-detail',
  templateUrl: './active-city-detail.component.html',
  styleUrls: ['./active-city-detail.component.scss'],
})
export class ActiveCityDetailComponent implements OnInit, OnChanges {
  @Input() tempScale: string;
  @Input() fullWeatherData: FullWeatherData;
  todaysDate: Date;
  currentDate: Date;
  dayOfWeek: string;

  displayDayOfWeek(date: Date): string {
    return date.toLocaleDateString(undefined, {
      weekday: 'long',
    });
  }

  displayCurrentDateFormatted(): string {
    return this.currentDate.toLocaleDateString(undefined);
  }

  displayTime(date: Date): string {
    return date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  getWeatherIcon(iconCode: string): string {
    return `../../assets/icons/${iconCode}.png`;
  }

  ngOnInit(): void {
    this.todaysDate = new Date();
    this.currentDate = new Date();
    this.dayOfWeek = this.displayDayOfWeek(this.todaysDate);
  }

  ngOnChanges(): void {
    this.currentDate = this.fullWeatherData.data[0].validDate;
    this.dayOfWeek = this.displayDayOfWeek(this.currentDate);
  }
}
