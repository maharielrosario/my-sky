import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { WeatherService } from '../weather.service';
import { FullWeatherData, HTTPErrorData } from 'src/app/interfaces';
import { API_5_DAY_ROOT_URL, API_KEY } from 'private';
import moment from 'moment';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService],
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(WeatherService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('getWeather should return weather data', () => {
    let actualWeatherData: FullWeatherData | HTTPErrorData | undefined;
    const inputValue = '21742';
    const inputType = 'number';
    service.getFullWeather(inputValue, inputType).subscribe((weatherData) => {
      actualWeatherData = weatherData;
    });
    const request = httpTestingController.expectOne(
      `${API_5_DAY_ROOT_URL}postal_code=${inputValue}&key=${API_KEY}&days=5`
    );

    const today: string = moment().format();
    const testWeatherData: FullWeatherData = {
      cityName: 'Hagerstown',
      countryCode: 'USA',
      lat: 34,
      lon: 23,
      stateCode: 'MD',
      timezone: 'America/New York',
      data: [
        {
          rh: 2,
          appMaxTemp: 10,
          appMinTemp: 10,
          cloudsHi: 10,
          cloudsLow: 10,
          cloudsMid: 10,
          pres: 10,
          maxTemp: 10,
          minTemp: 10,
          moonPhase: 10,
          moonriseTs: 10,
          moonsetTs: 10,
          ozone: 10,
          moonPhaseLunation: 10,
          clouds: 10,
          ts: 10,
          windGustSpd: 10,
          maxDhi: null,
          windSpd: 10,
          pop: 10,
          windCdirFull: 'test',
          highTemp: 10,
          lowTemp: 10,
          windCdir: 'test',
          slp: 10,
          vis: 10,
          snowDepth: 10,
          dewpt: 10,
          snow: 10,
          uv: 10,
          precip: 10,
          validDate: today,
          windDir: 10,
          sunriseTs: 10,
          sunsetTs: 10,
          weather: {
            icon: 'test',
            code: 10,
            description: 'test',
          },
          datetime: 'test',
          temp: 10,
        },
      ],
    };
    request.flush(testWeatherData);
    expect(actualWeatherData).toEqual(testWeatherData);
  });
});
