import { Component, Input } from '@angular/core';
import { WeatherService } from '../weather.service';
import { determineInputType, replaceSpacesForApi, fToC, cToF } from '../util';
import { CityWeatherData, WeatherData, HTTPErrorData } from '../interfaces';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss'],
})
export class CitiesComponent {
  @Input() appName: string;
  @Input() searchValue = '';
  @Input() tempScale = 'Celsius';
  weatherData: CityWeatherData;
  error: string;
  constructor(private weatherService: WeatherService) {}
  getWeather(): void {
    if (this.error) {
      this.error = '';
    }
    if (this.searchValue) {
      const apiInputValue = replaceSpacesForApi(this.searchValue);
      const inputType = determineInputType(this.searchValue);
      this.weatherService
        .getWeather(apiInputValue, inputType, this.tempScale)
        .subscribe(
          (response: WeatherData) => {
            const { data } = response;
            this.weatherData = data[0];
            const roundedTemp = this.weatherData.temp.toFixed();
            this.weatherData.temp = parseInt(roundedTemp, 10);
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
      if (this.weatherData) {
        this.weatherData.temp = cToF(this.weatherData.temp);
      }
      this.tempScale = 'Fahrenheit';
    } else {
      if (this.weatherData) {
        this.weatherData.temp = fToC(this.weatherData.temp);
      }
      this.tempScale = 'Celsius';
    }
  }
}
