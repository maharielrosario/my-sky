import { Component, Input } from '@angular/core';
import { WeatherService } from '../weather.service';
import { normalizeInput } from '../util';
import { CityWeatherData, WeatherData, HTTPErrorData } from '../interfaces';
@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss'],
})
export class CitiesComponent {
  @Input() appName: string;
  cityWeatherDetails: CityWeatherData;
  error: string;
  constructor(private weatherService: WeatherService) {}
  getWeather(inputValue: string): void {
    const { normalizedInputValue, inputType } = normalizeInput(inputValue);
    this.weatherService.getWeather(normalizedInputValue, inputType).subscribe(
      (response: WeatherData) => {
        const { data: cities } = response;
        let matchingCity: CityWeatherData;
        cities.filter((city) => {
          const normalizedCityName = city.cityName.toLowerCase();
          if (
            (inputType === 'string' &&
              normalizedCityName === normalizedInputValue) ||
            inputType === 'number'
          ) {
            matchingCity = city;
          }
        });
        this.cityWeatherDetails = matchingCity;
        console.log(this.cityWeatherDetails);
      },
      (error: HTTPErrorData) => {
        this.error = error.message;
      }
    );
  }
}
