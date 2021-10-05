import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FullWeatherData } from '../interfaces';

@Component({
  selector: 'cities-overview',
  templateUrl: './cities-overview.component.html',
  styleUrls: ['./cities-overview.component.scss'],
})
export class CitiesOverviewComponent {
  @Input() appName: string;
  @Input() searchValue: string;
  @Input() tempScale: string;
  @Input() error: string;
  @Input() fullWeatherData: FullWeatherData;
  @Output()
  getFullWeather: EventEmitter<FullWeatherData> = new EventEmitter();
  @Output() updateSearchValue: EventEmitter<string> = new EventEmitter();
  @Output() updateTempScale: EventEmitter<string> = new EventEmitter();

  getTheWeather(): void {
    this.getFullWeather.emit(null);
  }
  updateTheSearchValue(newSearchValue: string): void {
    this.updateSearchValue.emit(newSearchValue);
  }
  updateTheTempScale(): void {
    this.updateTempScale.emit(null);
  }
}
