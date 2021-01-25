import { Component } from '@angular/core';
import {
  HTTPErrorData,
  FullWeatherData,
  OneDayWeatherData,
} from './interfaces';
import { determineInputType, replaceSpacesForApi, fToC, cToF } from './util';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  appName = 'My Sky';
  fullWeatherData: FullWeatherData;
  searchValue = '';
  tempScale = 'Celsius';
  error: string;

  constructor(private weatherService: WeatherService) {}

  getFullWeather(): void {
    if (this.error) {
      this.error = '';
    }
    if (this.searchValue) {
      const apiInputValue = replaceSpacesForApi(this.searchValue);
      const inputType = determineInputType(this.searchValue);
      this.weatherService
        .getFullWeather(apiInputValue, inputType, this.tempScale)
        .subscribe(
          (response: FullWeatherData) => {
            this.fullWeatherData = response;
            this.fullWeatherData.data.forEach((day: OneDayWeatherData) => {
              let roundedTemp = day.temp.toFixed();
              if (roundedTemp === '-0') {
                roundedTemp = '0';
              }
              day.temp = parseInt(roundedTemp, 10);
            });
            this.searchValue = '';
          },
          (error: HTTPErrorData) => {
            this.error = error.message;
          }
        );
    } else {
      this.error = 'No city entered';
    }
  }
  updateSearchValue(newSearchValue: string): void {
    this.searchValue = newSearchValue;
  }
  updateTempScale(): void {
    if (this.tempScale === 'Celsius') {
      if (this.fullWeatherData) {
        this.fullWeatherData.data.forEach((day) => {
          day.temp = cToF(day.temp);
        });
      }
      this.tempScale = 'Fahrenheit';
    } else {
      if (this.fullWeatherData) {
        this.fullWeatherData.data.forEach((day) => {
          day.temp = fToC(day.temp);
        });
      }
      this.tempScale = 'Celsius';
    }
  }
}
