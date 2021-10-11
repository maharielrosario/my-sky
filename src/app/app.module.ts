import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CitiesOverviewComponent } from './cities-overview/cities-overview.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalHTTPInterceptorService } from './services/global-httpinterceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CityDetailsComponent } from './city-details/city-details.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WeatherChartComponent } from './weather-chart/weather-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    CitiesOverviewComponent,
    CityDetailsComponent,
    NavbarComponent,
    WeatherChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHTTPInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
