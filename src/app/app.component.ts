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
              const roundTemp = (initialTemp: number) => {
                let roundedTemp = initialTemp.toFixed();
                if (roundedTemp === '-0') {
                  roundedTemp = '0';
                }
                return parseInt(roundedTemp, 10);
              };
              day.temp = roundTemp(day.temp);
              day.lowTemp = roundTemp(day.lowTemp);
              day.highTemp = roundTemp(day.highTemp);
            });
            this.searchValue = '';
            console.log(this.fullWeatherData);
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
          day.lowTemp = cToF(day.lowTemp);
          day.highTemp = cToF(day.highTemp);
        });
      }
      this.tempScale = 'Fahrenheit';
    } else {
      if (this.fullWeatherData) {
        this.fullWeatherData.data.forEach((day) => {
          day.temp = fToC(day.temp);
          day.lowTemp = fToC(day.lowTemp);
          day.highTemp = fToC(day.highTemp);
        });
      }
      this.tempScale = 'Celsius';
    }
  }
}
