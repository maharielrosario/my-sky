import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CityWeatherData } from '../interfaces';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss'],
})
export class CitiesComponent {
  @Input() appName: string;
  @Input() searchValue: string;
  @Input() tempScale: string;
  @Input() weatherData: CityWeatherData;
  @Output() getWeather: EventEmitter = new EventEmitter();
  @Output() updateSearchValue: EventEmitter = new EventEmitter();
  @Output() updateTempScale: EventEmitter = new EventEmitter();

  getTheWeather(): void {
    this.getWeather.emit(null);
  }
  updateTheSearchValue(newSearchValue: string): void {
    this.updateSearchValue.emit(newSearchValue);
  }
  updateTheTempScale(): void {
    this.updateTempScale.emit(null);
  }
}
