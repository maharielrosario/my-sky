import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_KEY, API_ROOT_URL } from '../../private';
import { WeatherData } from './interfaces';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  convertToCamelCase(payload: WeatherData): WeatherData {
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

  getWeather(inputValue: string, inputType: string): Observable<WeatherData> {
    let fullAPIUrl: string;
    if (inputType === 'string') {
      fullAPIUrl = `${API_ROOT_URL}city=${inputValue}&key=${API_KEY}`;
    } else {
      fullAPIUrl = `${API_ROOT_URL}postal_code=${inputValue}&key=${API_KEY}`;
    }
    return this.http.get<WeatherData>(fullAPIUrl).pipe(
      map((resp) => {
        const normalizedPayload = this.convertToCamelCase(resp);
        return normalizedPayload;
      })
    );
  }
}
