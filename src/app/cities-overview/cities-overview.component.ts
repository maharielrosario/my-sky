import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
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
  @ViewChild('searchInput') searchInput: HTMLInputElement;

  imgSrc =
    'https://images.unsplash.com/photo-1512850183-6d7990f42385?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80';

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
