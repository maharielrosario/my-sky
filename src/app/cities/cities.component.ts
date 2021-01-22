import { Component, Input } from '@angular/core';
import { WeatherService } from '../weather.service';
import { determineInputType, replaceSpacesForApi } from '../util';
import { CityWeatherData, WeatherData, HTTPErrorData } from '../interfaces';
@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss'],
})
export class CitiesComponent {
  @Input() appName: string;
  @Input() searchValue = '';
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
      this.weatherService.getWeather(apiInputValue, inputType).subscribe(
        (response: WeatherData) => {
          const { data } = response;
          this.weatherData = data[0];
          this.searchValue = '';
          console.log(this.weatherData);
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
}
