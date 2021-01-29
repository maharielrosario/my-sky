export interface FullWeatherData {
  cityName: string;
  countryCode: string;
  lat: number;
  lon: number;
  stateCode: string;
  timezone: string;
  data: [OneDayWeatherData];
}
export interface OneDayWeatherData {
  rh: number;
  appMaxTemp: number;
  appMinTemp: number;
  cloudsHi: number;
  cloudsLow: number;
  cloudsMid: number;
  pres: number;
  maxTemp: number;
  minTemp: number;
  moonPhase: number;
  moonriseTs: number;
  moonsetTs: number;
  ozone: number;
  moonPhaseLunation: number;
  clouds: number;
  ts: number;
  windGustSpd: number;
  maxDhi: null;
  windSpd: number;
  pop: number;
  windCdirFull: string;
  highTemp: number;
  lowTemp: number;
  windCdir: string;
  slp: number;
  vis: number;
  snowDepth: number;
  dewpt: number;
  snow: number;
  uv: number;
  precip: number;
  validDate: Date;
  windDir: number;
  sunriseTs: number;
  sunsetTs: number;
  weather: {
    icon: string;
    code: number;
    description: string;
  };
  datetime: string;
  temp: number;
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
