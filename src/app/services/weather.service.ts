import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import moment from 'moment';
import {
  FullWeatherData,
  HTTPErrorData,
  OneDayWeatherData,
} from '../interfaces';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  handleError(error: HttpErrorResponse): Observable<HTTPErrorData> {
    return throwError(error);
  }

  convertToCamelCase(payload: FullWeatherData): FullWeatherData {
    const makeCamelCase = (s: string): string =>
      s.replace(/([-_][a-z])/gi, (current) =>
        current.toUpperCase().replace('-', '').replace('_', '')
      );
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        const newKey = makeCamelCase(key);
        const value = payload[key];
        delete payload[key];
        payload[newKey] = value;
        if (typeof value === 'object') {
          this.convertToCamelCase(value);
        }
      }
    }
    return payload;
  }

  normalizeApiDate(apiDate: string): string {
    return moment(apiDate).format();
  }

  getFullWeather(
    inputValue: string,
    inputType: string,
    tempScale?: string
  ): Observable<FullWeatherData | HTTPErrorData> {
    let fullAPIUrl: string;
    if (inputType === 'string') {
      fullAPIUrl = `${environment.weatherBitBaseUrl}?city=${inputValue}&key=${environment.weatherBitApiKey}`;
    } else {
      fullAPIUrl = `${environment.weatherBitBaseUrl}?postal_code=${inputValue}&key=${environment.weatherBitApiKey}`;
    }
    if (tempScale === 'Fahrenheit') {
      fullAPIUrl = `${fullAPIUrl}&units=I`;
    }
    return this.http.get<FullWeatherData>(fullAPIUrl).pipe(
      map((resp) => {
        let normalizedPayload = JSON.parse(JSON.stringify(resp));
        normalizedPayload = this.convertToCamelCase(normalizedPayload);
        normalizedPayload.data.forEach(
          (day: OneDayWeatherData) =>
            (day.validDate = this.normalizeApiDate(day.validDate))
        );
        return normalizedPayload;
      }),
      catchError((error) => this.handleError(error))
    );
  }
}
