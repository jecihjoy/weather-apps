import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './routing.module';
import { MaterialModule } from './material.module';
import { NgxPaginationModule } from 'ngx-pagination';
import 'hammerjs';

import { LocationService } from './services/location.service';
import { WeatherService } from './services/weather.service';

import { AppComponent } from './app.component';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { MapWeatherComponent } from './map-weather/map-weather.component';
import { CityWeatherComponent } from './city-weather/city-weather.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MoodWeatherComponent } from './mood-weather/mood-weather.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherForecastComponent,
    CurrentWeatherComponent,
    MapWeatherComponent,
    CityWeatherComponent,
    MoodWeatherComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [LocationService,
    WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
