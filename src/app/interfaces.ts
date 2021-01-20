export interface WeatherData {
  data: CityWeatherData[];
  count: number;
}

export interface CityWeatherData {
  rh: number;
  pod: string;
  lon: number;
  pres: number;
  timezone: string;
  obTime: string;
  countryCode: string;
  clouds: string;
  ts: number;
  solarRad: number;
  stateCode: string;
  cityName: string;
  windSpd: number;
  windCdirFull: string;
  windCdir: string;
  slp: number;
  vis: number;
  hAngle: number;
  sunset: string;
  dni: number;
  dewpt: number;
  snow: number;
  uv: number;
  precip: number;
  windDir: number;
  sunrise: string;
  ghi: number;
  dhi: number;
  aqi: number;
  lat: number;
  weather: {
    icon: string;
    code: number;
    description: string;
  };
  datetime: string;
  temp: number;
  station: string;
  elevAngle: number;
  appTemp: number;
}

export interface HTTPErrorData {
  headers: {
    normalizedNames: Record<string, unknown>;
    lazyUpdate: null;
  };
  status: number;
  statusText: string;
  url: string;
  ok: boolean;
  name: string;
  message: string;
  error: {
    error: string;
  };
}
